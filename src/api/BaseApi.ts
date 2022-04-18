import HTTPTransport from "../utils/HTTPTransport";

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(idetifier?: string): Promise<unknown>;

  public abstract update?(data: unknown): Promise<unknown>;

  public abstract delete?(identifier?: string): Promise<unknown>;
}