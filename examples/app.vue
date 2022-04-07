<template>
    <div id="app">
        <div class="main-header">
            <div class="main-header-logo">
                <img :src="logo"
                    alt="logo">
            </div>
            <div class="main-header-title">CommonUI</div>
            <ul class="main-header-nav">
                <li class="active">组件</li>
            </ul>
        </div>

        <div class="main">
            <div class="main-left">
                <side-nav :navsData="navConfig"></side-nav>
            </div>
            <div class="main-right">
                <router-view class="markdown"></router-view>
            </div>
        </div>

    </div>

</template>

<script>
    import logo from './assets/images/logo.png';
    import SideNav from './components/side-nav';
    import {navConfig} from './nav.config.js';
    export default {
        name: 'App',
        components: {SideNav},
        data() {
            return {
                logo,
                navConfig
            };
        }
    };
</script>

<style>
    body {
        margin: 0 30px;
        padding: 0;
        font-family: Microsoft YaHei;
    }
    .router-link-active {
        color: #42b983 !important;
    }
    #app {
        overflow: hidden;
        padding: 0;
        width: 100%;
    }
    #app .main-header {
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        -webkit-box-shadow: 0 2px 8px #f0f1f2;
        box-shadow: 0 2px 8px #f0f1f2;
        position: relative;
        z-index: 10;
        height: 65px;
        color: #444;
    }
    #app .main-header .main-header-logo {
        height: 100%;
        float: left;
        margin-left: 20px;
        position: absolute;
    }
    #app .main-header .main-header-logo img {
        height: 30px;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    #app .main-header .main-header-title {
        height: 65px;
        line-height: 65px;
        font-size: 25px;
        display: inline-block;
        padding-left: 75px;
        font-weight: bold;
    }
    #app .main-header .main-header-nav {
        margin: 0;
        padding: 0;
        float: right;
        height: 100%;
        background: transparent;
        margin-right: 160px;
    }
    #app .main-header .main-header-nav li {
        margin-right: 22px;
        list-style: none;
        color: #304455;
        height: 100%;
        line-height: 65px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        min-width: 50px;
        border-top: 2px solid transparent;
        text-align: center;
        cursor: pointer;
        font-size: 15px;
        float: left;
        border-bottom: 3px solid #fff;
        -webkit-transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    #app .main-header .main-header-nav li.active {
        border-bottom: 2px solid #42b983;
    }
    #app .main {
        position: relative;
        margin-left: 0;
        margin-right: 0;
        height: auto;
        zoom: 1;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    #app .main .main-left {
        float: left;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        height: calc(100vh - 66px);
        overflow: scroll;
        border-right: 1px solid #eee;
    }

    #app .main .main-right {
        padding: 0 84px 80px 64px;
        height: calc(100vh - 160px);
        overflow: scroll;
    }
    #app .main .main--right a {
        color: #41a259;
        text-decoration: none;
    }
    .markdown h1 {
        color: #0d1a26;
        font-weight: 500;
        margin-bottom: 20px;
        margin-top: 8px;
        font-size: 30px;
        line-height: 38px;
    }
    .markdown h2,
    .markdown h3,
    .markdown h4,
    .markdown h5,
    .markdown h6 {
        font-family: Lato;
        margin: 1.6em 0 0.6em;
        font-weight: 400;
        clear: both;
        color: #1f2f3d;
    }
    .markdown h2 {
        margin-top:15px; 
    }
    .markdown h3 {
        font-size: 18px;
    }
    .markdown h4 {
        font-size: 16px;
    }
    .markdown h5 {
        font-size: 14px;
    }
    .markdown h6 {
        font-size: 12px;
    }
    .markdown p,
    .markdown pre {
        font-size: 14px;
        color: #5e6d82;
        line-height: 1.5em;
    }
    .markdown ul > li > p,
    .markdown ol > li > p {
        margin: 0.2em 0;
    }
    .markdown ul {
        padding: 0;
        margin: 0;
    }
    .markdown ul > li {
        list-style-type: none;
        margin-left: 20px;
        padding-left: 4px;
        padding-top: 15px;
    }
    .markdown ol > li {
        list-style-type: decimal;
        margin-left: 20px;
        padding-left: 4px;
        padding-top: 15px;
    }
    .markdown > table {
        border-collapse: collapse;
        border-spacing: 0;
        empty-cells: show;
        border: 1px solid #ebedf0;
        width: 100%;
        margin: 8px 0 16px;
        font-size: 14px;
    }
    .markdown > table th,
    .markdown > table td {
        color: #314659;
        border: 1px solid #ebedf0;
        text-align: left;
        padding: 10px 15px;
    }
    .markdown > table th {
        white-space: nowrap;
        color: #5c6b77;
        font-weight: 500;
        background: rgba(0, 0, 0, 0.02);
    }
    .markdown strong,
    .markdown b {
        font-weight: 500;
    }
    .markdown .sh-markdown-permalink {
        opacity: 0;
    }
    .markdown h1:hover .sh-markdown-permalink,
    .markdown h2:hover .sh-markdown-permalink,
    .markdown h3:hover .sh-markdown-permalink,
    .markdown h4:hover .sh-markdown-permalink,
    .markdown h5:hover .sh-markdown-permalink,
    .markdown h6:hover .sh-markdown-permalink {
        opacity: 1;
        display: inline-block;
    }
    .markdown > br,
    .markdown p > br {
        clear: both;
    }
    .markdown blockquote {
        font-size: 90%;
        color: #0d1a26;
        border-left: 4px solid #ebedf0;
        padding-left: 0.8em;
        margin: 1em 0;
    }
    .markdown blockquote p {
        margin: 0;
    }
    .markdown hr {
        height: 1px;
        border: 0;
        background: #ebedf0;
        clear: both;
    }
    .markdown code {
        font-family: Microsoft YaHei;
        margin: 0 1px;
        background: #f2f4f5;
        padding: 0.2em 0.5em;
        border-radius: 3px;
        font-size: 0.9em;
        border: 1px solid #eee;
    }
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
</style>
