<template>
    <div id="sign" class="card" >
        <MDBInput v-model="name" label="Name" type="text" />
        <br>
        <MDBInput v-model="email" label="Email" type="email" />
        <br>
        <MDBInput v-model="pass" label="Password" type="password" />
        <br>
        <MDBBtn @click="submit" color="secondary">Register</MDBBtn>
      
    </div>
</template>

<script>
import axios from "axios";
import { MDBInput, MDBBtn } from "mdb-vue-ui-kit";
export default {
    components: {
    MDBInput,
    MDBBtn
  },
  data: ()=> {
      return {
          email:null,
          pass:null,
          name:null
      }
  },
  mounted(){
      if(sessionStorage.getItem("log")!=null)
      {
          this.$router.push("/");
      }
  },
  methods:{
      submit()
      {
          var data={
              "email":this.email,
              "password":this.pass,
              "name":this.name
          }
         axios.post("http://localhost:3000/register", data).
         then((response) => {
            console.log(response.data);
                    //handle response -----session storage---
                // this.$router.push("/");
                if(response.data.result==1)
                {
                    this.$router.push("/otp");
                }
                else
                {
                    this.$router.push("/signup");
                }
        
      });
      }
      }
  
}
</script>
<style scoped>
#sign{
   width: 500px;
   margin: auto;
   

}
</style>