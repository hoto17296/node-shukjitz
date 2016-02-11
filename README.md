# Shukjitz
[![Build Status](https://travis-ci.org/hoto17296/node-shukjitz.svg?branch=master)](https://travis-ci.org/hoto17296/node-shukjitz)

指定した日付が日本の祝日かどうかを判定する

## Installation
```
npm install shukjitz --save
```

## Why?
祝日をリスト化して判定するのに違和感があったので Google Calendar から取得して判定するようにしたかった

- Google Calendar に登録されている範囲に限られるため、±1年程度の日付しか判定できないので注意
- 取得したデータは一定期間キャッシュする(デフォルトで24時間)

## Usage
``` javascript
var Shukjitz = require('shukjitz');

var shukjitz = new Shukjitz();

shukjitz.check(new Date(2016, 0, 1), function(res) {
  console.log(res); //=> '元日'
});
```

Promise でも可

``` javascript
var promise = shukjitz.check(new Date(2016, 0, 1));
promise.then(function(res) {
  console.log(res); //=> '元日'
});
```

引数を省略すると現在の日付

``` javascript
shukjitz.check().then(function(res) {
  console.log(res); //=> 祝日名 or null
});
```
