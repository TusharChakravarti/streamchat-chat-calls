import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)


const FROM = 'StreamChat <onboarding@resend.dev>'

export const sendVerificationEmail = async (to, fullName, token) => {
  const url = `${process.env.CLIENT_URL}/verify-email?token=${token}`

  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Verify your StreamChat email address',
    html: `
      <!DOCTYPE html><html><head><meta charset="utf-8"/>
      <style>
        body{margin:0;padding:0;background:#0d0d1a;font-family:Arial,sans-serif}
        .wrap{max-width:560px;margin:40px auto;background:#0a0a14;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden}
        .head{background:linear-gradient(135deg,#0f0a1e,#1a0f2e);padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .logo{font-size:20px;font-weight:800;color:#a78bfa}
        .body{padding:36px 32px}
        h1{color:#f1f0ff;font-size:22px;font-weight:700;margin:0 0 12px}
        p{color:rgba(255,255,255,0.5);font-size:14px;line-height:1.7;margin:0 0 24px}
        .btn{display:inline-block;padding:13px 32px;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;font-size:14px;font-weight:600;border-radius:10px;text-decoration:none}
        .note{margin-top:24px;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.6}
        .link{color:#a78bfa;word-break:break-all}
        .foot{padding:20px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;font-size:12px;color:rgba(255,255,255,0.2)}
      </style></head><body>
      <div class="wrap">
        <div class="head"><div class="logo">⚡ StreamChat</div></div>
        <div class="body">
          <h1>Verify your email address</h1>
          <p>Hey ${fullName}, welcome aboard! Click the button below to verify your email and activate your StreamChat account.</p>
          <a href="${url}" class="btn">Verify My Email</a>
          <div class="note">
            <p>This link expires in <strong style="color:rgba(255,255,255,0.4)">24 hours</strong>. If you didn't create an account, ignore this email.</p>
            <p style="margin-top:10px">Or copy this link:<br/><a href="${url}" class="link">${url}</a></p>
          </div>
        </div>
        <div class="foot">© ${new Date().getFullYear()} StreamChat. All rights reserved.</div>
      </div>
      </body></html>
    `,
  })
}


export const sendPasswordResetEmail = async (to, fullName, token) => {
  const url = `${process.env.CLIENT_URL}/reset-password?token=${token}`

  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Reset your StreamChat password',
    html: `
      <!DOCTYPE html><html><head><meta charset="utf-8"/>
      <style>
        body{margin:0;padding:0;background:#0d0d1a;font-family:Arial,sans-serif}
        .wrap{max-width:560px;margin:40px auto;background:#0a0a14;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden}
        .head{background:linear-gradient(135deg,#0f0a1e,#1a0f2e);padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .logo{font-size:20px;font-weight:800;color:#a78bfa}
        .body{padding:36px 32px}
        h1{color:#f1f0ff;font-size:22px;font-weight:700;margin:0 0 12px}
        p{color:rgba(255,255,255,0.5);font-size:14px;line-height:1.7;margin:0 0 24px}
        .btn{display:inline-block;padding:13px 32px;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;font-size:14px;font-weight:600;border-radius:10px;text-decoration:none}
        .warn{background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:12px 16px;margin-top:24px}
        .warn p{color:rgba(239,68,68,0.8);font-size:13px;margin:0}
        .note{margin-top:16px;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.6}
        .link{color:#a78bfa;word-break:break-all}
        .foot{padding:20px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;font-size:12px;color:rgba(255,255,255,0.2)}
      </style></head><body>
      <div class="wrap">
        <div class="head"><div class="logo">⚡ StreamChat</div></div>
        <div class="body">
          <h1>Reset your password</h1>
          <p>Hey ${fullName}, we received a request to reset your StreamChat password. Click below to set a new one.</p>
          <a href="${url}" class="btn">Reset My Password</a>
          <div class="warn"><p>⚠️ This link expires in <strong>1 hour</strong>. After that you'll need to request a new one.</p></div>
          <div class="note">
            <p>If you didn't request this, ignore this email — your password won't change.</p>
            <p style="margin-top:10px">Or copy this link:<br/><a href="${url}" class="link">${url}</a></p>
          </div>
        </div>
        <div class="foot">© ${new Date().getFullYear()} StreamChat. All rights reserved.</div>
      </div>
      </body></html>
    `,
  })
}