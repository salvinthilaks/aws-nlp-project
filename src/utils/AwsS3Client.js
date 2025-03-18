// Simple URL generator for public S3 bucket access
const REGION = "us-east-1"; 
const BUCKET_NAME = "salvin-nlp-project";

// S3 public URL format
const S3_PUBLIC_URL = `https://${BUCKET_NAME}.s3.amazonaws.com`;

export default class AwsS3Client {
  /**
   * Get a public URL for a video in S3
   * @param {string} key - Video filename
   * @returns {string} - Public URL
   */
  static getVideoUrl(key) {
    if (!key) {
      throw new Error("Video key/filename is required");
    }
    
    try {
      console.log("Getting public URL for:", key);
      // Use simple string concatenation, no SDK calls
      const url = `${S3_PUBLIC_URL}/${encodeURIComponent(key)}`;
      console.log("Public URL:", url);
      return url;
    } catch (error) {
      console.error("Error forming URL:", error);
      throw error;
    }
  }

  /**
   * For backward compatibility
   */
  static async getSignedUrl(key) {
    return this.getVideoUrl(key);
  }

  /**
   * List objects in the S3 bucket - placeholder only 
   * This doesn't actually access S3, it just returns an empty array
   * @returns {Promise<Array>} - Empty array (placeholder)
   */
  static async listObjects() {
    console.log("listObjects: This is just a placeholder that returns an empty array");
    return [];
  }
}