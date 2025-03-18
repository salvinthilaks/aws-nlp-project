// Direct AWS S3 client using direct URLs
const REGION = "us-east-1"; 
const BUCKET_NAME = "salvin-nlp-project";

// S3 URL for direct access
const S3_BASE_URL = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com`;

export default class AwsS3Client {
  /**
   * Get a direct URL for a video in S3
   * @param {string} key - Video filename
   * @returns {string} - Direct URL
   */
  static getVideoUrl(key) {
    try {
      console.log("Getting direct URL for:", key);
      const url = `${S3_BASE_URL}/${encodeURIComponent(key)}`;
      console.log("Generated URL for S3 object:", url);
      return url;
    } catch (error) {
      console.error("Error getting URL:", error);
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
   * List objects in the S3 bucket
   * @returns {Promise<Array>} - List of objects
   */
  static async listObjects() {
    try {
      // For listing objects, we return a static success message
      console.log("Attempting to list objects from public bucket");
      return [];
    } catch (error) {
      console.error("Error listing objects:", error);
      throw error;
    }
  }
}