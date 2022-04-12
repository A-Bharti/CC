<template>
    <div id="login" class="card" >
        <MDBInput v-model="email" label="Email" type="email" />
        <br>
        <MDBInput v-model="pass" label="Password" type="password" />
        <br>
        <MDBBtn @click="submit" color="secondary">LogIn</MDBBtn>
      
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
          pass:null
      }
  },
  methods:{
      submit()
      {
          var data={
              "email":this.email,
              "password":this.pass
          }
         axios.post("http://localhost:3000/login", data).
         then((response) => {
            console.log(response.data);
                    //handle response -----session storage---
                
                if(response.data.result==1)
                    {
                        sessionStorage.setItem("log","1");
                        sessionStorage.setItem("email",this.email);
                        sessionStorage.setItem("privatekey",response.data.privatekey);
                        this.$router.push("/otp");
                    }
                    else
                    {
                            this.$router.push("/login");
                    }

        
      });
      }
      }
  
}
</script>

<style scoped>
#login{
   width: 500px;
   margin: auto;
   box-shadow: null;
   

}
</style>