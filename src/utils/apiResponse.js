

export default class ApiResponse {
    static success(res, data = null, message = "Success", statusCode = 200) {
      return res.status(statusCode).json({
        success: true,
        message,
        data,
      });
    }
  
    static error(res, error = null, statusCode = 500) {
      console.error("API Error:", error);
      const  message = error.message || "An error occurred" ;
      return res.status(statusCode).json({
        success: false,
        message,
        error: error?.message || error || null,
      });
    }
  }
  