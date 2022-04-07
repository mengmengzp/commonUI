<template>
    <ul class="nav">
        <li v-for="(nav, i) in navsData.component" :key="i">
            <h4 class="title" @click="showList(i)">{{nav.name}} 
                <span class="arrow" :class="{'up': showMore[i], 'down': !showMore[i]}"></span>
            </h4>
            <ul v-show="showMore[i]">
                <li v-for="(subnav, j) in nav.groups" :key="j">
                    <router-link
                        :to="nav.path + subnav.path"
                        exact
                        v-text="subnav.title"
                    ></router-link>	
                </li>
            </ul>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        navsData: Object
    },
        data() {
            return {
                showMore: [true]
            }
        },
    created() {
        console.log(this.navsData);
    },
    methods: {
        showList(index) {
            this.$set(this.showMore, index, !this.showMore[index])
        }
    }
};
</script>
<style scoped>
.nav {
    width: 230px;
    margin: 0;
    padding: 0;
}
.title {
    position: relative;
}
.arrow {
    position: absolute;
    right: 20px;
    top: 5px;
    width: 14px;
    height: 7px;
    display: inline-block;
    background-image: url('../assets/images/up.png');
    background-size: 100% 100%;
}
.arrow:hover {
    cursor: pointer;
}
.up {
    transform: rotate(0deg);
}
.down {
    transform: rotate(180deg);
}
ul li {
        margin: 0;
        list-style: none;
        padding: 0;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
	ul li a {
        font-size: 14px;
        color: #444;
        line-height: 40px;
        height: 40px;
        margin: 0;
        padding: 4px 0;
        font-weight: 400;
        text-decoration: none;
        display: block;
        position: relative;
        -webkit-transition: 0.15s ease-out;
        transition: 0.15s ease-out;
    }
	ul li a:hover {
        color: #42b983;
    }
	ul li.main--link-group {
        height: auto;
    }
	ul li.main--link-group a:hover {
        color: #333;
        cursor: default;
    }
	ul li.main--link-group ul a {
        display: block;
        height: 40px;
        color: #444;
        line-height: 40px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 400;
    }
	ul li.main--link-group ul a:hover {
        color: #41a259;
        cursor: pointer;
    }
</style>