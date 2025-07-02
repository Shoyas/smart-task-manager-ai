import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json()

    if (!title) {
      return NextResponse.json({ error: "Task title is required" }, { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
You are a productivity assistant. Break down the following task into exactly 3-5 smaller, specific, and actionable subtasks.

Task: "${title}"
${description ? `Description: "${description}"` : ""}

Requirements:
- Each subtask should be a clear, actionable step
- Subtasks should be specific and measurable
- Return ONLY the subtasks, one per line
- No numbering, bullets, or extra formatting
- Maximum 5 subtasks

Example format:
Research company background and recent news
Practice coding problems on LeetCode
Prepare 5 thoughtful questions to ask interviewer
Review resume and prepare STAR method examples
Choose professional outfit and prepare materials
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the response to extract subtasks
    const subtasks = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.match(/^\d+\./) && line !== "")
      .slice(0, 5) // Limit to 5 subtasks

    if (subtasks.length === 0) {
      // Fallback subtasks if AI fails
      const fallbackSubtasks = [
        "Break down the main task into smaller components",
        "Research any required information or resources",
        "Create a timeline for completion",
        "Identify potential obstacles and solutions",
        "Set up necessary tools or materials",
      ]
      return NextResponse.json({ subtasks: fallbackSubtasks })
    }

    return NextResponse.json({ subtasks })
  } catch (error) {
    console.error("Error generating subtasks:", error)

    // Provide helpful fallback subtasks
    const fallbackSubtasks = [
      "Plan the approach and gather requirements",
      "Research best practices and resources",
      "Break the task into smaller actionable steps",
      "Set milestones and deadlines",
      "Review and refine the plan",
    ]

    return NextResponse.json({ subtasks: fallbackSubtasks })
  }
}