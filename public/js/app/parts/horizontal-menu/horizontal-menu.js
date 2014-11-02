/**
 * Created by k33g_org on 02/11/14.
 */

export default (options) => {
  console.log("horizontal menu", options)

  options.router
    .add("toggle", (args) => {
      switch(args[0]) {
        case "humans":
          console.log("humans")
          options.sharedServices.humans.toggleUX();
          break;
        case "contents":
          console.log("contents")
          break;
        default:
        //foo
      }
    })
}
