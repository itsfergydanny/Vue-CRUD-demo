<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <form @submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>
 
 <script>
import db from '@/firebase/init';
import slugify from 'slugify';
export default {
  name: 'AddSmoothie',
  methods: {
    AddSmoothie() {
      if (this.title) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db
          .collection('smoothies')
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push('/');
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = 'You must enter a smoothie title!';
      }
    },
    addIngredient() {
      if (this.another != null) {
        if (this.ingredients.length < 10) {
          this.ingredients.push(this.another);
          this.another = null;
          this.feedback = null;
        } else {
          this.feedback = 'Max amount of ingredients reached (10)!';
        }
      } else {
        this.feedback = 'You must enter a value to add an ingredient';
      }
    },
    deleteIngredient(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  },
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  }
};
</script>
 
 <style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
 