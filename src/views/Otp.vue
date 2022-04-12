<template>
  <!-- Button trigger modal -->
  <div id="otpbtn">
 <MDBBtn 
    color="primary"
    aria-controls="staticBackdropLabel"
    @click="verify"
  >
    Intiate OTP Verification
  </MDBBtn>
  </div>
 
  <!-- Modal -->
  <MDBModal
    id="staticBackdrop"
    tabindex="-1"
    labelledby="staticBackdropLabel"
    v-model="staticBackdrop"
    staticBackdrop
  >
    <MDBModalHeader>
      <MDBModalTitle id="staticBackdropLabel"> OTP Verification</MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>

  <MDBInput v-model="otp" label="OTP" type="text" />


    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="staticBackdrop = false"> Close </MDBBtn>
      <MDBBtn color="primary" @click="verify_two"> Verify </MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
  import {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
    MDBInput
  } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';
  import axios from "axios";
  export default {
    components: {
      MDBModal,
      MDBModalHeader,
      MDBModalTitle,
      MDBModalBody,
      MDBModalFooter,
      MDBBtn,
      MDBInput
    },
    data:()=>{
        return {
            otp:null,
            
        }
    },
    methods:{
        verify()
        {
          var data={
            email: sessionStorage.getItem("email")
          }
          axios.post("http://localhost:3000/getotp", data).
            then((response) => {
            console.log(response.data);
            if(response.data.result==1)
            {
              // this.verify_two()
                this.staticBackdrop = true
            }
            else
            {
              this.$router.push("/otp");
            }        
             });

          
        },
        verify_two(){
          
            var data={
              "email": sessionStorage.getItem("email"),
                "otp":this.otp
            }
            axios.post("http://localhost:3000/verifyotp", data).
            then((response) => {
            console.log(response.data);
            if(response.data.result==1)
            {
              sessionStorage.setItem("otp","1");
              this.$router.push("/");
            }
            else
            {
              this.$router.push("/login");
            }            
        
             });
        }
    },
    setup() {
      const staticBackdrop = ref(false);
      return {
        staticBackdrop,
      };
    },
  };
</script>

<style scoped>
#otpbtn{
    display: flex;
    /* border: solid; */
    height: 90vh;
  align-items: center;
  align-content: center;
  justify-content: center;

}
</style>>
