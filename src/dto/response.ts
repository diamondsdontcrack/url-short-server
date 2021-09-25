// dto stands for data transfer object

export interface BaseSuccfessResponseBody<T extends Record<string, unknown>> {
  code: "success"
  data: T
}

export interface FailResponseBody {
  code: "fail"
  error: { message: string }
}
