import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const body = await request.json();
        const { visitorEmail, visitorName, message } = body;

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Bot <onboarding@resend.dev>',
            to: process.env.HIRE_EMAIL || 'shivambiswal01@gmail.com',
            subject: `🚀 New Hire Request from ${visitorName || 'Anonymous Visitor'}`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0f; color: #ffffff; border-radius: 16px;">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <h1 style="font-size: 24px; font-weight: 700; color: #ffffff; margin: 0;">🖥️ BISWAL/OS — Incoming Hire Request</h1>
                        <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin-top: 8px;">Someone ran <code style="background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px;">sudo hire shivam</code> on your portfolio</p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 16px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="color: rgba(255,255,255,0.5); padding: 8px 0; font-size: 13px; width: 120px;">Name</td>
                                <td style="color: #ffffff; padding: 8px 0; font-size: 14px; font-weight: 600;">${visitorName || 'Not provided'}</td>
                            </tr>
                            <tr>
                                <td style="color: rgba(255,255,255,0.5); padding: 8px 0; font-size: 13px;">Email</td>
                                <td style="color: #ffffff; padding: 8px 0; font-size: 14px; font-weight: 600;">${visitorEmail || 'Not provided'}</td>
                            </tr>
                            <tr>
                                <td style="color: rgba(255,255,255,0.5); padding: 8px 0; font-size: 13px;">Message</td>
                                <td style="color: #ffffff; padding: 8px 0; font-size: 14px;">${message || 'No message — just ran the command!'}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="text-align: center; margin-top: 24px;">
                        <p style="color: rgba(255,255,255,0.3); font-size: 11px;">Sent from your portfolio terminal at ${new Date().toISOString()}</p>
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (err: any) {
        console.error('Hire API error:', err);
        return NextResponse.json({ success: false, error: err.message || 'Unknown error' }, { status: 500 });
    }
}
