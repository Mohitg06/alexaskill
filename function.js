const myfunctions = {
  getNGO: function(nonprofits,nonprofits_purpose) {
    console.log("Getting into geNGOFunction");

// Get an random non profits if its not defined
    if (nonprofits === undefined) {
      var totalngo = Object.keys(nonprofits_purpose).length;
      var rand = Math.floor(Math.random() * totalngo);

      // random Non profit name
      nonprofits = Object.keys(nonprofits_purpose)[rand];
    }

    // check if Non profit exists and it has a name
    switch (nonprofits) {
      case "HelpMe":
        nonprofits = "HelpMe";
        break;
      case "SoupKitchen":
        nonprofits = "SoupKitchen";
        break;
      case "Craigs":
        nonprofits = "Craigs";
        break;
      default:
        nonprofits: "Unknown";
    }

    // return both the ngo name and the purpose as an array
    return [nonprofits,nonprofits_purpose];
  }
};

module.exports = myfunctions;