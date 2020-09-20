import sentry_sdk


def capture_exception_with_sentry():
    sentry_sdk.capture_exception(Exception("This is an example of an error message."))
