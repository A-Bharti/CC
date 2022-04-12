<template>
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
      <MDBBtn color="primary" @click="verify_two_"> Verify </MDBBtn>
    </MDBModalFooter>
  </MDBModal>

  <div id="upload">
    <MDBFile v-model="files" label="" />
    <br />
    <MDBBtn
      color="primary"
      aria-controls="staticBackdropLabel"
      @click="verify_(1)"
    >
      Upload
    </MDBBtn>
  </div>
  <div id="download">
    <hr />

    <MDBListGroup>
      <MDBListGroupItem v-for="item in list" :key="item.link">
        <p>{{ item.filename }}</p>
        <MDBBtn @click="down(item)" color="warning">Download</MDBBtn>
      </MDBListGroupItem>
    </MDBListGroup>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import {
  MDBFile,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import axios from "axios";



export default {
  name: "Home",

  components: {
    MDBFile,
    MDBBtn,
    MDBListGroup,
    MDBListGroupItem,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,

    MDBInput,
  },
  data: () => {
    return {
      files: null,
      otp: null,
      list: null,
      item: null,
      idx: null,
    };
  },
  methods: {
    ...mapMutations(["setAuth"]),
    verify_(i) {
      this.idx = i;
      var data = {
        email: sessionStorage.getItem("email"),
      };
      axios.post("http://localhost:3000/getotp", data).then((response) => {
        console.log(response.data);
        if (response.data.result == 1) {
          // this.verify_two()
          this.staticBackdrop = true;
        } else {
          this.$router.push("/");
        }
      });
    },
    verify_two_() {
      var data = {
        email: sessionStorage.getItem("email"),
        otp: this.otp,
      };
      axios.post("http://localhost:3000/verifyotp", data).then((response) => {
        console.log(response.data);
        if (response.data.result == 1) {
          if (this.idx == 1) this.submitFIle();
          else this.download(this.item);
        } else {
          this.$router.push("/");
        }
      });
    },
    submitFIle() {
      //sending uploaded file to backend
      const formData = new FormData();
      formData.append("file", this.files);
      var data = {
        email: sessionStorage.getItem("email"),
        // file:---------------------
      };
      formData.append("data", data);
      console.log(formData);
      axios
        .post("http://localhost:3000/uploadfile", formData)
        .then((response) => {
          console.log(response.data);
        });
    },
    down(i) {
      this.item = i;
      this.verify_(0);
    },
    download(item) {
   
      var data = {
        email: sessionStorage.getItem("email"),
        link: item.link,
      };
      axios
        .post("http://localhost:3000/downloadfile", data)
        .then((response) => {
          console.log(response.data);
            // \\save file  
        })
  }},
  setup() {
    const staticBackdrop = ref(false);
    return {
      staticBackdrop,
    };
  },
  mounted() {
    if (
      sessionStorage.getItem("otp") == null ||
      sessionStorage.getItem("email") == null
    ) {
      this.$router.push("/login");
    } else {
      this.setAuth(1);
      axios.get("http://localhost:3000/getfilelist").then((response) => {
        console.log(response.data);
        this.list = response.data.list;
      });

      
    }
  },
};
</script>

