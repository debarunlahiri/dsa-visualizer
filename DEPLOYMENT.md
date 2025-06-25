# Deployment Guide

## Code Execution API Limitations

This application includes a code execution API that supports multiple programming languages. However, there are important limitations when deploying to serverless platforms like Vercel.

### Supported Languages by Platform

| Language   | Local Development | Vercel (Node.js Runtime) | Vercel (Native Runtimes) | Other Serverless |
|------------|-------------------|---------------------------|--------------------------|------------------|
| JavaScript | ✅ Full Support   | ✅ Full Support          | ✅ Full Support         | ✅ Full Support |
| Python     | ✅ Full Support   | ❌ Limited*              | ✅ Full Support         | ✅ Usually Supported |
| Java       | ✅ Full Support   | ❌ Not Available         | ❌ Not Available        | ❌ Usually Not Available |
| C++        | ✅ Full Support   | ❌ Not Available         | ❌ Not Available        | ❌ Usually Not Available |

*Limited: Python code execution via subprocess from Node.js functions is not supported

### Why Java/C++/Python Don't Work in This Implementation

This application tries to execute code by spawning subprocesses from a Node.js function. Vercel's Node.js runtime environment doesn't include:
- Java Development Kit (JDK) with `javac` compiler
- Java Runtime Environment (JRE) with `java` command  
- GCC/G++ compilers for C++
- Python interpreter (when running in Node.js runtime)

**Important**: Vercel DOES support Python natively through its Python runtime, but this requires creating separate Python functions, not executing Python code from within Node.js functions.

### Solutions

#### Option 1: Use Alternative Platforms
Deploy to platforms that support custom runtimes:
- **Railway**: Supports Docker containers with custom environments
- **Render**: Allows custom Docker images
- **DigitalOcean App Platform**: Supports buildpacks with Java/C++
- **AWS Lambda**: With custom layers for Java/C++

#### Option 2: Use Vercel's Native Python Runtime
For Python support on Vercel:
- Create separate Python functions in `/api` directory (e.g., `api/python-executor.py`)
- Use Vercel's native Python runtime instead of subprocess execution
- Modify your frontend to call the appropriate runtime-specific endpoints

#### Option 3: Client-Side Execution
For educational/demo purposes, consider:
- **WebAssembly (WASM)**: Compile Java/C++ to WASM for browser execution
- **Online Compilers**: Integrate with services like Judge0 API
- **Code Playgrounds**: Embed CodePen, JSFiddle, or similar

#### Option 4: Disable Unsupported Languages
The current implementation gracefully handles missing compilers by:
1. Checking for compiler availability before execution
2. Returning user-friendly error messages
3. Suggesting alternative languages

### Current Error Handling

The API now includes:
- Environment detection for Vercel deployment
- Compiler availability checks
- Graceful fallback with informative error messages

### Recommended Deployment Steps

1. **For Vercel** (Current Setup):
   ```bash
   npm run build
   vercel deploy
   ```
   - Java/C++ will show helpful error messages
   - JavaScript/Python will work normally

2. **For Full Language Support**:
   - Use Docker-based deployment
   - Include JDK and GCC in your container
   - Deploy to platforms supporting custom runtimes

### Testing Locally

To test the full functionality locally:
```bash
# Ensure Java is installed
java -version
javac -version

# Ensure C++ compiler is installed
g++ --version

# Run development server
npm run dev
```

### Environment Variables

The API automatically detects the deployment environment:
- `process.env.VERCEL` - Detected on Vercel deployments
- Compiler checks are performed before code execution

This ensures users get clear feedback about language availability on different platforms. 