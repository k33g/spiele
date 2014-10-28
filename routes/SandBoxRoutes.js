/**
 * Created by k33g_org on 28/10/14.
 */

export default (app) => {

  app.get("/hello", (req, res) => {
    res.send({message:"hello world"})
  });

}
