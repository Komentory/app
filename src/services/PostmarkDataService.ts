import { postmarkClient } from '__/requests'

/**
 * @class PostmarkDataService
 * @description Axios service provider for make API requests to Postmark model.
 */
class PostmarkDataService {
  /**
   * @method send
   * @description Method to send email with given email, template alias and variables.
   * @param {IPostmarkRequest} sendData
   * @returns Promise
   */
  send(sendData: IPostmarkRequest): Promise<any> {
    let data: any = JSON.stringify({
      To: sendData.email,
      From: import.meta.env.FROM_EMAIL_ADDRESS,
      TemplateAlias: sendData.template,
      TemplateModel: sendData.variables,
    })
    return postmarkClient.post('/email/withTemplate', data)
  }
}

/**
 * @interface IPostmarkRequest
 * @description Public interface to describe request data for Postmark email sender.
 */
export interface IPostmarkRequest {
  email: string
  template: string
  variables: object
}

// Export SignOut data service.
export default new PostmarkDataService()
