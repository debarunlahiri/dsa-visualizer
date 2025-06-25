from http.server import BaseHTTPRequestHandler
import json
import sys
import io
import contextlib
import traceback
import time

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Read the request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Parse JSON
            data = json.loads(post_data.decode('utf-8'))
            code = data.get('code', '')
            
            if not code:
                self.send_error_response('No code provided')
                return
            
            # Execute Python code safely
            result = self.execute_python_code(code)
            
            # Send response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            
            response = json.dumps(result)
            self.wfile.write(response.encode('utf-8'))
            
        except Exception as e:
            self.send_error_response(f'Server error: {str(e)}')
    
    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def execute_python_code(self, code):
        # Capture stdout and stderr
        old_stdout = sys.stdout
        old_stderr = sys.stderr
        
        stdout_capture = io.StringIO()
        stderr_capture = io.StringIO()
        
        try:
            # Redirect output
            sys.stdout = stdout_capture
            sys.stderr = stderr_capture
            
            # Create a restricted execution environment
            safe_globals = {
                '__builtins__': {
                    'print': print,
                    'len': len,
                    'str': str,
                    'int': int,
                    'float': float,
                    'bool': bool,
                    'list': list,
                    'dict': dict,
                    'tuple': tuple,
                    'set': set,
                    'range': range,
                    'enumerate': enumerate,
                    'zip': zip,
                    'map': map,
                    'filter': filter,
                    'sorted': sorted,
                    'sum': sum,
                    'min': min,
                    'max': max,
                    'abs': abs,
                    'round': round,
                    'pow': pow,
                    'divmod': divmod,
                    'isinstance': isinstance,
                    'type': type,
                    'hasattr': hasattr,
                    'getattr': getattr,
                    'setattr': setattr,
                    'chr': chr,
                    'ord': ord,
                    'hex': hex,
                    'oct': oct,
                    'bin': bin,
                    'any': any,
                    'all': all,
                    'Exception': Exception,
                    'ValueError': ValueError,
                    'TypeError': TypeError,
                    'IndexError': IndexError,
                    'KeyError': KeyError,
                    'AttributeError': AttributeError,
                }
            }
            
            # Add math module
            import math
            safe_globals['math'] = math
            
            # Execute the code with timeout
            start_time = time.time()
            exec(code, safe_globals, {})
            execution_time = time.time() - start_time
            
            # Check for timeout (5 seconds)
            if execution_time > 5:
                return {'error': 'Code execution timed out (5 second limit)'}
            
            # Get output
            output = stdout_capture.getvalue()
            errors = stderr_capture.getvalue()
            
            result = {}
            if output:
                result['output'] = output.strip()
            else:
                result['output'] = 'Code executed successfully (no output)'
                
            if errors:
                result['error'] = errors.strip()
            
            return result
            
        except Exception as e:
            error_msg = str(e)
            if 'timeout' in error_msg.lower():
                error_msg = 'Code execution timed out (5 second limit)'
            elif 'memory' in error_msg.lower():
                error_msg = 'Code execution exceeded memory limit'
            
            return {
                'error': f'Python execution error: {error_msg}',
                'output': stdout_capture.getvalue() if stdout_capture.getvalue() else None
            }
        
        finally:
            # Restore stdout and stderr
            sys.stdout = old_stdout
            sys.stderr = old_stderr
    
    def send_error_response(self, message):
        self.send_response(400)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        error_response = json.dumps({'error': message})
        self.wfile.write(error_response.encode('utf-8')) 