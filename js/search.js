Vue.component('search', {
    data() {
        return {
            searchLine: ``,
        }
    },
    template: `<form action="#" class="search" @submit.prevent="$root.$refs.catalog.filterGoods(searchLine)">
                    <input type="text" class="search__input" placeholder="Поиск" v-model="searchLine">
                    <button type="submit" class="btn search__button"><i class="fas fa-search"></i></button>
                </form>`
});