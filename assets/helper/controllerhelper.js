function formatCreatedAt(dateString) {
    const createdAt = new Date(dateString);
    const formattedDate = createdAt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  
    return formattedDate;
  }

  
  module.exports={
    formatCreatedAt
  };