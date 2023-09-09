

  export const formatDate = (dateString) => {
       const options = {
           year: "numeric",
           month: "long",
           day: "numeric",
           hour: "numeric",
           minute: "numeric",
       };
       return new Date(dateString).toLocaleDateString(undefined, options);
   };

    
export const formatDateForTaskList = (dateString) => {
    const options = {
        month: "short", // Use 'short' for abbreviated month name (e.g., "Jan")
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
