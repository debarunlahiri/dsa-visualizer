# Multi-Language Code Execution Setup Guide

This guide explains how to enable full support for Python, Java, and C++ code execution on your Vercel deployment.

## Current Status

✅ **JavaScript**: Fully working (native Node.js runtime)  
🔄 **Python**: Now supported via Vercel's native Python runtime  
🔄 **Java**: Available via external Judge0 API  
🔄 **C++**: Available via external Judge0 API  

## Setup Instructions

### 1. Python Support (Native Vercel Runtime)

Python is now fully supported using Vercel's native Python runtime:

- **Endpoint**: `/api/python-execute`
- **Runtime**: Native Python 3.12
- **Status**: ✅ Ready to use
- **Features**: 
  - Secure execution environment
  - 5-second timeout
  - Memory limits
  - Safe built-in functions only

**Test Python execution:**
```bash
curl -X POST https://dsa.summitcodeworks.com/api/python-execute \
  -H "Content-Type: application/json" \
  -d '{"code":"print(\"Hello from Python!\")"}'
```

### 2. Java & C++ Support (External Judge0 API)

For Java and C++ support, you can use the Judge0 API integration:

#### Option A: Free Judge0 API (RapidAPI)

1. **Sign up for RapidAPI**: https://rapidapi.com/judge0-official/api/judge0-ce
2. **Get your API key** from the RapidAPI dashboard
3. **Add environment variable** in Vercel:
   ```
   RAPIDAPI_KEY=your_rapidapi_key_here
   ```

#### Option B: Self-hosted Judge0 (Recommended for production)

1. **Deploy Judge0 CE**: https://github.com/judge0/judge0
2. **Update the API endpoint** in `/api/external-execute/route.ts`:
   ```typescript
   const JUDGE0_API = 'https://your-judge0-instance.com';
   ```

### 3. Environment Variables Setup

Add these environment variables in your Vercel dashboard:

```bash
# For Judge0 API (if using RapidAPI)
RAPIDAPI_KEY=your_rapidapi_key_here

# For self-hosted Judge0 (optional)
JUDGE0_API_URL=https://your-judge0-instance.com
```

**To add environment variables in Vercel:**
1. Go to your project dashboard
2. Navigate to Settings → Environment Variables
3. Add the required variables
4. Redeploy your application

### 4. Testing the Setup

#### Test Python (Native Runtime):
```bash
curl -X POST https://dsa.summitcodeworks.com/api/python-execute \
  -H "Content-Type: application/json" \
  -d '{"code":"for i in range(3): print(f\"Hello {i}\")"}'
```

#### Test Java (External API):
```bash
curl -X POST https://dsa.summitcodeworks.com/api/external-execute \
  -H "Content-Type: application/json" \
  -d '{"code":"System.out.println(\"Hello from Java!\");","language":"java"}'
```

#### Test C++ (External API):
```bash
curl -X POST https://dsa.summitcodeworks.com/api/external-execute \
  -H "Content-Type: application/json" \
  -d '{"code":"cout << \"Hello from C++!\" << endl;","language":"cpp"}'
```

### 5. Frontend Integration

Update your frontend to use the appropriate endpoints:

```javascript
async function executeCode(code, language) {
  let endpoint = '/api/execute'; // Default for JavaScript
  
  if (language === 'python') {
    endpoint = '/api/python-execute';
  } else if (language === 'java' || language === 'cpp') {
    endpoint = '/api/external-execute';
  }
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, language })
  });
  
  return await response.json();
}
```

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Vercel Edge    │    │   Execution     │
│   (React/Next)  │───▶│   Functions      │───▶│   Environments  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ├─ JavaScript ──▶ Node.js Runtime
                              ├─ Python ──────▶ Python Runtime  
                              └─ Java/C++ ───▶ Judge0 API
```

## Security Features

- **Sandboxed execution** for all languages
- **Timeout limits** (5 seconds)
- **Memory restrictions**
- **Safe built-ins only** (Python)
- **No file system access**
- **No network access** (except for external APIs)

## Cost Considerations

- **JavaScript**: Free (Vercel Functions)
- **Python**: Free tier available (Vercel Functions)
- **Java/C++**: 
  - RapidAPI: 50 requests/month free, then $0.004/request
  - Self-hosted: Server costs only

## Troubleshooting

### Python Issues
- Check if the Python function deployed correctly
- Verify the endpoint is accessible
- Check Vercel function logs

### Java/C++ Issues
- Verify RAPIDAPI_KEY is set correctly
- Check Judge0 API status
- Monitor API rate limits
- Consider self-hosting for production

### General Issues
- Check Vercel function logs
- Verify CORS headers
- Test endpoints individually
- Monitor execution timeouts

## Next Steps

1. **Deploy the changes**: `vercel deploy --prod`
2. **Set up environment variables** in Vercel dashboard
3. **Test each language** using the provided curl commands
4. **Update your frontend** to use the new endpoints
5. **Monitor usage** and consider upgrading plans if needed

## Support

For issues with:
- **Vercel deployment**: Check Vercel documentation
- **Judge0 API**: Visit Judge0 documentation
- **Code execution**: Check the function logs in Vercel dashboard 