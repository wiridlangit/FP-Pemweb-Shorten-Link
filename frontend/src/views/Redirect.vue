<script>
import db from '../firebase/config.js';

export default {
  name: 'Redirect',
  props: {
  },
  mounted(){
    db.collection('shorten_list').where('short', '==', this.$route.params.full).onSnapshot((todo) => {
      if(todo.empty){
        this.$router.push({name: '404'});
      } else {
        window.location.replace(todo.docs[0].data().full);
      }
    })
  }
}
</script>
<!-- 
<template>
  <p>please Wait</p>
</template>
<script>
import axios from 'axios'

export default {
  data() {
      return {
          ids: this.$route.params.id,
      }
  },

  methods: {
      async getRedirect() {
          try{
              const res = await axios.get('http://localhost:3000/redirect',{
                  params: {id: this.ids}
              })
              window.location.href = res.data
              console.log(res.data)
          }
          catch(err){
              console.log(err)
          }
      },
  },
  mounted() {
      this.getRedirect()
  },
}
</script> -->