<template>

<div id="navbar">
<div id="title">
  <h3 id="paper">Cloud Computing [A New Secure Model for Data Protection over Cloud Computing]</h3> 
</div>
<div id="nav">
<router-link to="/login" v-if="this.$store.state.auth ==0" type="button" class="btn btn-primary">Log In</router-link> 
<router-link to="/logout" v-if="this.$store.state.auth ==1" type="button" class="btn btn-dark">Log Out</router-link> 
<router-link to="/signup" v-if="this.$store.state.auth ==0" type="button" class="btn btn-danger">Sign Up</router-link> 
</div>

</div>
     
<div id="win">
<router-view class="view" />
</div>


</template>

<script>
//import { MDBNavbarNav, MDBNavbar, MDBNavbarItem} from "mdb-vue-ui-kit";
export default {
  components: {
//   MDBNavbarNav, MDBNavbar, MDBNavbarItem
  },
  data:()=>{
  return    {
    // log:0
    }
  },
  mounted(){
    this.log=sessionStorage.getItem("log")=="1"
  }
}
</script>

<style>

#navbar{

  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.8);
  margin-bottom: 50px;
  background: #6EC72D;
  color: white;
  padding: 10px;

}
#paper{
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
#title{
  display: inline-block;
}
#nav{
  float: right;
  display: inline-block;
  color: white;
  
}


#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
