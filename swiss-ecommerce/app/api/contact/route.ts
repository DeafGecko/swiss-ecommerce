import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
      try {
      const { name, email, message } = await req.json()

      if (!name || !email || !message) {
            return NextResponse.json(
            { error: 'All fields are required' },
            { status: 400 }
            )
      }

// Create transporter
      const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            },
      })

// Email options
      const mailOptions = {
            from: process.env.SMTP_USER,
            to: 'dwirog@gmail.com',
            subject: `New Contact Form Message from ${name}`,
            text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
            `,
            html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            `,
      }

      await transporter.sendMail(mailOptions)

      return NextResponse.json({ success: true })
      } catch (error) {
      console.error('Contact form error:', error)
      return NextResponse.json(
            { error: 'Failed to send message. Please try again.' },
            { status: 500 }
      )
      }
}
