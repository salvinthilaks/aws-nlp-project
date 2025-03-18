// Direct AWS S3 client using CloudFront
const CLOUDFRONT_DOMAIN = "https://d2hnl32vv25xsr.cloudfront.net";

export default class AwsS3Client {
  /**
   * Get a direct URL for a video via CloudFront
   * @param {string} key - Video filename
   * @returns {string} - Direct URL
   */
  static getVideoUrl(key) {
    try {
      console.log("Getting CloudFront URL for:", key);
      const url = `${CLOUDFRONT_DOMAIN}/${encodeURIComponent(key)}`;
      console.log("Generated URL for video:", url);
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
      // We cannot list objects from CloudFront, this is just a placeholder
      console.log("CloudFront doesn't support listing objects directly");
      return [];
    } catch (error) {
      console.error("Error listing objects:", error);
      throw error;
    }
  }
}