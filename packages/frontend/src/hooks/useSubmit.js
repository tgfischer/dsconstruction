import { useState, useCallback } from "react";
import { noop } from "lodash";

export const useSubmit = ({
  handleSubmit,
  handleFinish = noop,
  handleError = noop
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return [
    isSubmitting,
    useCallback(
      data => (
        setIsSubmitting(true),
        handleSubmit(data)
          .then(() => (setIsSubmitting(false), handleFinish()))
          .catch(
            err => (setIsSubmitting(false), handleError(err), handleFinish())
          )
      ),
      [handleError, handleFinish, handleSubmit]
    )
  ];
};
