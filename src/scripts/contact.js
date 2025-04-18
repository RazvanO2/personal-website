// File: src/pages/api/contact.js
export async function POST({ request }) {
    try {
      const data = await request.formData();
      
      // Get form data
      const name = data.get('name');
      const email = data.get('email');
      const subject = data.get('subject');
      const message = data.get('message');
      const recaptchaResponse = data.get('g-recaptcha-response');
      
      // Validate form inputs
      if (!name || !email || !subject || !message) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'All fields are required' 
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Validate reCAPTCHA
      if (!recaptchaResponse) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Please complete the reCAPTCHA verification' 
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Verify reCAPTCHA with Google
      const recaptchaVerification = await verifyRecaptcha(recaptchaResponse);
      
      if (!recaptchaVerification.success) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'reCAPTCHA verification failed' 
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Process the form submission (e.g., send email)
      // This is where you'd typically integrate with an email sending service
      // For example, using Nodemailer, SendGrid, or a similar service
      
      // Return success response
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Your message has been sent successfully!' 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
      
    } catch (error) {
      console.error('Error processing contact form:', error);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'An error occurred while processing your request' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  
  async function verifyRecaptcha(token) {
    const SECRET_KEY = import.meta.env.RECAPTCHA_SECRET_KEY;
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${SECRET_KEY}&response=${token}`
    });
    
    return await response.json();
  }