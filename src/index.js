import Promise from 'promise';
import ical from 'ical';

// 日本の祝日 - Google カレンダー
const ICS_URL_DEFAULT = 'https://calendar.google.com/calendar/ical/ja.japanese%23holiday%40group.v.calendar.google.com/public/basic.ics';

class Shukjitz {

  constructor(opts = {}, cb) {
    this.url = opts.url || ICS_URL_DEFAULT;
    this.expiration = opts.expiration || ( 60 * 60 * 24 );
    this.lastFetched = 0;
    this._fetch(cb);
  }

  _fetch(cb) {
    // 前回取得したデータが有効期限内であれば何もしない
    let expired = this.lastFetched + ( 100 * this.expiration );
    if ( expired > new Date().getTime() ) {
      if ( typeof cb === 'function' ) { cb(); }
      return;
    }
    // 祝日の一覧を取得する
    this.data = {};
    ical.fromURL(this.url, {}, (err, data) => {
      if ( err ) { console.error(err); return; }
      this.lastFetched = new Date().getTime();
      for ( let k in data ) {
        if ( ! data.hasOwnProperty(k) ) { continue; }
        this.data[ data[k].start.toDateString() ] = data[k].summary;
      }
      if ( typeof cb === 'function' ) { cb(); }
    });
  }

  check(date = new Date(), cb) {
    return new Promise((resolve, reject) => {
      this._fetch(() => {
        date = this.data[ date.toDateString() ];
        let res = date ? date : null;
        if ( typeof cb === 'function' ) { cb(res); }
        resolve(res);
      });
    });
  }

}

export default Shukjitz;
module.exports = Shukjitz;
