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