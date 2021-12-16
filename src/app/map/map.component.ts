//@ts-nocheck

import { Component, OnInit } from '@angular/core';
import { load as AMapLoaderLoad } from '@amap/amap-jsapi-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log(234);
    AMapLoaderLoad({
      key: '13d2b0b79a1cfb8ae8ecc70ed37d3134',
      AMapUI: {
        version: '1.1',
        plugins: ['overlay/SimpleMarker'],
      },
      Loca: {
        version: '1.3.2',
      },
      version: '1.4.15',
    }).then((AMap) => {
      var map = new AMap.Map('container');
      new AMapUI.SimpleMarker({
        map: map,
        position: map.getCenter(),
      });

      var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京',
        clickable: true,
        extData:123
      });
      marker.on('click',(e)=>{
        console.log('dianji',e)
      })
      map.add(marker);
    });
  }
}
