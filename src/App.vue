<template>
  <div id="app"
       v-if="!$route.meta.front">
    <router-view />
  </div>
  <div v-else>
    <vip-header v-if="!$route.meta.single"></vip-header>
    <router-view />
    <!-- <vip-footer></vip-footer> -->
  </div>
</template>

<script>
import util from '@/libs/util'
import VipHeader from '@/views/front/components/header'
import VipFooter from '@/views/front/components/footer'
export default {
  name: 'app',
  components: { VipHeader, VipFooter },
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created () {
    this.i18nHandle(this.$i18n.locale)
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/style/public-class.scss";
</style>
