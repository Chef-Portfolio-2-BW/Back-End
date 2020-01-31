
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, userId:1,  name: 'lasagna', mealId: 3, img:'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjG972wzKznAhXMJDQIHZTJDyAQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.thekitchn.com%2Flasagna-recipe-simple-22956038&psig=AOvVaw2byX9JBp5hmBgw0HlBec5h&ust=1580517426223055' },
        {id: 2, userId:1,  name: 'pancakes', mealId: 1, img: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwirhIXEzKznAhX5IjQIHXYAAXkQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.thekitchn.com%2Fpancakes-recipe-263226&psig=AOvVaw312cYL4A13cTi7ySt0W270&ust=1580517464119585'},
        {id: 3, userId:2,  name: 'meatball', mealId: 3, img: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjburLYzKznAhXuHjQIHRPEBIoQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.flavcity.com%2Fmeatballs-sauces%2F&psig=AOvVaw2tTP87dF7NavEQEoR2kRFA&ust=1580517502053896' },
        {id: 4, userId:3,  name: 'BLT', mealId: 4, img: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj11IvmzKznAhX7IDQIHfn5BscQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.myrecipes.com%2Frecipe%2Fthe-sl-blt&psig=AOvVaw1CopsI-oTCpfj3DzWSm32g&ust=1580517537265844' }
      ]);
    });
};
