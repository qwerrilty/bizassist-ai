/**
 * Builds the system + user prompts for each tool.
 * Keeping prompts in one file makes them easy to tune.
 */

const SYSTEM_BASE =
  'You are an expert business communication and admin writer for Australian small businesses. ' +
  'Write professional, practical, ready-to-use content. Use Australian English spelling.'

export function buildPrompt(toolId, fields) {
  switch (toolId) {
    case 'invoice':
      return {
        system: SYSTEM_BASE,
        user: `Write a payment follow-up email for an overdue invoice.
Business Name: ${fields.businessName || 'Our Business'}
Client Name: ${fields.clientName}
Invoice Number: ${fields.invoiceNum || 'N/A'}
Amount Owing: $${fields.amount} AUD
Due Date: ${fields.dueDate || 'recently'}
Days Overdue: ${fields.daysOverdue || 'unknown'}
Tone: ${fields.tone}
Write a complete, ready-to-send email with subject line.`,
      }

    case 'quote':
      return {
        system: SYSTEM_BASE,
        user: `Write a quote follow-up email.
Business Name: ${fields.businessName || 'Our Business'}
Client Name: ${fields.clientName}
Service Quoted: ${fields.service}
Quote Amount: ${fields.quoteAmount ? '$' + fields.quoteAmount + ' AUD' : 'not specified'}
Days Since Sent: ${fields.daysSince || 'a few days'}
Tone: ${fields.tone}
Write a complete email with subject line that encourages the client to proceed.`,
      }

    case 'bas':
      return {
        system: SYSTEM_BASE + ' Always recommend confirming figures with their accountant.',
        user: `Explain these BAS figures in plain English.
Business: ${fields.businessName || 'Our Business'}
Period: ${fields.period || 'not specified'}
Total Sales: ${fields.totalSales ? '$' + fields.totalSales : 'not provided'}
GST Collected: ${fields.gstCollected ? '$' + fields.gstCollected : 'not provided'}
GST Paid on Purchases: ${fields.gstPaid ? '$' + fields.gstPaid : 'not provided'}
Wages/PAYG: ${fields.wages ? '$' + fields.wages : 'not provided'}
Questions: ${fields.questions || 'general BAS explanation'}
Explain each figure, calculate net GST position, flag anything unusual, and give a pre-lodgment checklist.`,
      }

    case 'review':
      return {
        system: SYSTEM_BASE,
        user: `Write a Google review response.
Business: ${fields.businessName || 'Our Business'} (${fields.businessType || 'small business'})
Reviewer: ${fields.reviewerName || 'the customer'}
Rating: ${fields.rating}/5
Review: "${fields.reviewText}"
Write a genuine, professional response under 150 words.`,
      }

    case 'complaint':
      return {
        system: SYSTEM_BASE,
        user: `Write a customer complaint response.
Business: ${fields.businessName || 'Our Business'}
Customer: ${fields.customerName || 'the customer'}
Channel: ${fields.channel}
Complaint: "${fields.complaint}"
Proposed Resolution: ${fields.resolution || 'we will investigate and make it right'}
Write an empathetic response that acknowledges the issue, apologises, explains next steps, and retains the relationship.`,
      }

    case 'jobad':
      return {
        system: SYSTEM_BASE,
        user: `Write a Seek.com.au job advertisement.
Business: ${fields.businessName || 'Our Business'}
Role: ${fields.role}
Location: ${fields.location}
Type: ${fields.type}
Salary: ${fields.salary || 'competitive'}
Experience: ${fields.experience || 'relevant experience preferred'}
Duties: ${fields.duties || 'standard duties for this role'}
Perks: ${fields.perks || 'supportive team environment'}
Write a compelling job ad 300-400 words with intro, responsibilities, requirements, and what's on offer.`,
      }

    case 'policy':
      return {
        system: SYSTEM_BASE + ' Ensure content is appropriate for Australian workplace law (Fair Work Act).',
        user: `Write a workplace policy document.
Business: ${fields.businessName || 'Our Business'}
Industry: ${fields.industry || 'general small business'}
Policy: ${fields.policyType}
Details: ${fields.customDetails || 'standard Australian small business policy'}
Include Purpose, Scope, Policy Details, and Employee Responsibilities sections.`,
      }

    case 'meeting':
      return {
        system: SYSTEM_BASE,
        user: `Convert these meeting notes into structured minutes.
Business/Team: ${fields.businessName || 'Our Business'}
Attendees: ${fields.attendees || 'not specified'}
Date: ${fields.date || 'not specified'}
Notes: ${fields.notes}
Format as: Meeting Details, Key Discussion Points, Decisions Made, Action Items (who/what/when), Next Steps.`,
      }

    case 'proposal':
      return {
        system: SYSTEM_BASE,
        user: `Write a business proposal.
Our Business: ${fields.businessName || 'Our Business'}
Client: ${fields.clientName}
Service/Project: ${fields.service}
Scope: ${fields.scope || 'full delivery as discussed'}
Price: ${fields.price ? '$' + fields.price + ' AUD' : 'to be discussed'}
Timeline: ${fields.timeline || 'to be agreed'}
Why Us: ${fields.whyUs || 'experienced, reliable, local Australian business'}
Write a complete proposal 400-500 words: Introduction, Requirements, Scope, Investment, Timeline, Why Us, Call to Action.`,
      }

    default:
      throw new Error(`Unknown tool: ${toolId}`)
  }
}
