<template>
  <div class="find-item">
    <div class="top">
      <img  src="../../assets/img/listImg2.jpg">
    </div>

    <div class="bottom">
      <div class="title">{{data.title}}</div>
      <div class="writer">周边生活</div>
      <div class="view">{{data.view}}人看过</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DocItem",
        props: {
            data: {
                type: Object
            }
        },
    }
</script>

<style scoped>

  .find-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 300px;
    color: #333;
    background-color: #fff;
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 10px;

  }

  .find-item .bottom {
    width: 100%;
    height: 100px;
    position: relative;
    margin-top: 10px;
  }
  .find-item .bottom .title {
    font-size: 18px;
    font-weight: bold;
  @include ellipsis(2);
  }
  .find-item .bottom .writer {
    color: #999;
    font-size: 14px;
    margin-top: 10px;
  }
  .find-item .bottom .view {
    position: absolute;
    bottom: 0;
    color: #999;
    font-size: 14px;
  }

  .find-item .top {
    width: 100%;
    height: 160px;
    overflow: hidden;
  }
  top img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

</style>
