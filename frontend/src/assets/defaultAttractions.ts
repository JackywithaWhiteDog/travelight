const defaultAttractions: { [key: string]: Array<{ name: string, pictureURL: string }> } = {
  'taipei-city': [
    {
      name: '國立故宮博物院',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQmRMFDGdvN9gl5bbQlJP3YJF0cM3frqZwfJVQAS_sKOx2miwRMG0gIrAHolP2jXw4eg6V0ORtV4s88Z54k25c80w'
    },
    {
      name: '台北101購物中心',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRDxju6mzV2fgp9cRqwk6DKhshIDKQPQCO7OVLSAvVtDoFgQdE_bTCJOWrcgAcUgmknIRTwJ-aIZGmDVHi3e-X_OQ'
    },
    {
      name: '國立中正紀念堂',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQSruXahxPmW6JSPyoUXiTmSfw0mL5tCqsytoSW4A-Ny-PeuLHd1fgg80JAmdijq2fvfYMH-OtPr43QqmOQJ8VWHg'
    },
    {
      name: '龍山寺',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRszAoHDO5nudDZsmKZ8J2obv52nrELBpo_8_IV9gi0l08PgbFUAV8Ipi5qGXgfG7CSIXMimzVyL0tKbzlHyBEy-g'
    },
    {
      name: '陽明山國家公園',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQQwZi7EGR0VC55XZCree5tg5wb1D231dYn_QVAr2LNqsqgwgcT3AQw32lFeSTZcXYJN9QIUPgG0LARNWIPYF0nRg'
    },
    {
      name: '饒河街觀光夜市',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcREGBRyoZ-TemYkiGdZsBpfYWfuvvNq3FTcumN7BBwpiEOQHmrBO6XMyYqCRMtV88wd6uxE51RqDj26UYZfCzAjKw'
    },
    {
      name: '臺北市立動物園',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR7mtYy9VKxTc5-7oj4WuOE4nuxk5eUdxb9uh7T8Ii_eE0C_7o4-zIh0oMy5NOpD7DL3pQsyMQWP9dNfUu510IkJQ'
    },
    {
      name: '國立國父紀念館',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8M6RwAv4cPjRbVJXHG83QdiCyJSC_oDphMcyWMbhLoVGSWwhP3YIcCstpJ_E4krhNiPeg1qiEuDcZYuHwJlnIgQ'
    }
  ],
  'new-taipei-city': [
    {
      name: '碧潭風景區',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRswHuM6wjrvlTkbHXf58iix3SHSa87m4oGFgAmm2b87jrJ_J2dxtIOTCXN0pT_fSf9Kfg7nEAIQjJCL1bSQxrBwQ'
    },
    {
      name: '林本源園邸',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ2BzcmwYLJOQ6ZBUHnfc8tzOu-H8-7wggUsyGOeZMWcKjRS6P2gmz5seXkIn7z-1UnMI1Zs3E6SkOQgRznE0EFrQ'
    },
    {
      name: '三貂角燈塔',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQvmZ1vlaSgLL932DQWZ9-cHf13_9e7wQbkOzZ44gDpZSfpBAWWgr8QzBkwHd_9Dadio10gR_P-c2HFD844t1_tgA'
    },
    {
      name: '新北市立鶯歌陶瓷博物館',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSXoR0KuqhDNO-8blfPzzhaDZq5nmblGSbct903qebe9zqZDaIXhUcdjS1BYoWi19UvoGE8rbeT5SrpCi1S5L6y0Q'
    },
    {
      name: '福隆海水浴場',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQcfxvxlpszODjKKqrj1pl3vVuXi1SdWHOICqdkWqAlUGvRKxSpSjsM00VdSYz9L0s3g7yk6BQjWgry5i0PBadO-Q'
    },
    {
      name: '淡水紅毛城',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLK4A_MxJWHxvZQ-OHqHB2JCSevEyCzjvLBSLa-sq1-B4-5pDsRbqb39899d6H7KxjJ1SbjFExaxX50prVJAbOQ'
    },
    {
      name: '淡水漁人碼頭',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQpJo-J_-jkZOkvgL9nergb8nllc5FHMTR5FmQK1ShsyFE6dmNHfmxwFcD2bFnn2MfqPagWDhwuOyyhJdBSKQvAyg'
    },
    {
      name: '滿月圓國家森林遊樂區',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRaP_vWAbQx_FEUN_-rchZejrUgqqE8gwoH-FNiKJ2zgeC6Y5x4IjlMNH61LJZgtNgJW1l4A-pIoQdXHAnjisanUA'
    }
  ],
  'taoyuan-city': [
    {
      name: '六福村主題遊樂園',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTbSppa5HcylKYGF9w53fAdLBaznANonRFfW1_K4uo0fMr-28uwp7fEgdzke1ywt_3jNy75jurfFbsPJ8cOG3H-_A'
    },
    {
      name: '大溪老街',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTaWWXZwhbcGFq6sP1lmTFcAIlz4GgJoGvFY3J1fE6E47nAC1zKx3MJj26xtrB3a48kjlcfAqsbqNZk6trbny1Zfg'
    },
    {
      name: '石門水庫',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRypIHMf9M8OnY2sXPqHd2kUzYeTfx_va0KRML13eymFZlCsJyq3t0POHnRcT7If8gDrJ5qszHO4qx2foo-Qq1Elw'
    },
    {
      name: '龜山',
      pictureURL: 'https://lh5.googleusercontent.com/p/AF1QipN5UzFHztPJSO9nTnoy1YpAyc6fRppN4lOisKls=w928-h520-n-k-no'
    },
    {
      name: 'Xpark',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSgH_7cGhOfkrc52IOmTl7UktoLscwq_FWXvKUA7wYQsLGh8WBJVb-LeEm1sEWgmTl0S8NL9imWoVEwr2TFtJdaTg'
    },
    {
      name: '虎頭山公園',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTc7O2iASL4rD4YxPHpf3CfA0R_fAofTVIgLSZyGmJ2FOEAfbQsH4lOwAQ_ZBS_8bFWHFsYyyScxQIJJFX7ebQylw'
    },
    {
      name: '中壢觀光夜市',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTFUL2ZWruAcBhtDfCIe-5zyiTBzVmtSDQ27qB-_dL-Yzy14szZTRFc5T6OGy8JNTzasPPp86xM6srmL1dNlIfnHg'
    },
    {
      name: '桃園觀光夜市',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSSIPwBwfZctD-WtjLyyQM1oae4tsNFeWuMZlYFcU3gw2yGDYbYzhJGGDhsU1-raiCBUhqEp5zAovt-GqyqI2DRNw'
    }
  ],
  'taichung-city': [
    {
      name: '彩虹眷村',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRHkJPN25JF4Tpc6z7RGfziX-c7bU81XaHDesOC2FSTOqiDLCYrHBo-7kw-B3XCE7UQlCu0xWR9jVdGT_Ogv3wEPA'
    },
    {
      name: '逢甲夜市',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ19qjgXsqT6u62Yl5bJa3GeHOsET0uJzEmFMj_UNPy5mRJnv_xcsumYAcER81DN-eQqaqxT14pg-SjqU4_MW3CZQ'
    },
    {
      name: '國立自然科學博物館',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTs63JgL3AjJm14Hlhi6orzEGUJMBzFaSIVBZVfs3DB6fZAUU5op-E8WZiSYdo40PVMFbsSLD8eIitPOpWcM3yzQg'
    },
    {
      name: '武陵農場',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSjypw6AiiliM5xCCU-1mYw7qRroXHE8w0fO2-tXvCFQP4BtAhLFHVgosa-h5hH-j7Bask0YLlSR-JXtmRbvuSo1w'
    },
    {
      name: '國立臺灣美術館',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6NPA7dHW4Q-yVmgfpxuUWcahUDwvN__9ZEuFCX1SHEpkGq1z4yDEW4RoUIX1vJfuoJfzgjjXWmubwKcQDK80-6g'
    },
    {
      name: '高美野生動物保護區',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTqWmpVcSka208QkCv87L7EghX4VHPrdgxRmGPXGaiBUf8kVEuZsX0jMk_lHkWZjzUq0ugL5Ga5SzIQMFb8CwMAgw'
    },
    {
      name: '臺中國家歌劇院',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNfIyNRc56g4yBv1Mo-mrU2jIpVozaDCRQJeXZ4aBqz3bceuRO8RseAq-08FZ_m4AXuvJdNSIPMQBo0jwVwaNBqA'
    },
    {
      name: '麗寶樂園',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQpr-0voIiFg2j2feQK11XfDSLFG-UuefHnJQ5zZ6qS6E38Oal4W7b799vHsVIEMN1m0ueNTOb3Ki0uR_z6RcCgaQ'
    }
  ],
  'tainan-city': [
    {
      name: '奇美博物館',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR4esUxKblIERd_5WuJX1rBO2HM4NdmNTQkYhwJt6d18-F8NKABx-EUzusa-u8Jbgzg1NE5rnANvArTwqPiXwKMpg'
    },
    {
      name: '安平古堡',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSTVxbxs37G1LiphI9n4GfpEidBBYP4wT-Mu2jKC7hDKfdLF0mqywjgJH54JowX5l8PUzJLpijuWmpWjUQWrvF94A'
    },
    {
      name: '赤崁樓',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcR9r9IpokZUlo2qGPcFfrlLwCAfHy7C4NuyrJ5ZeKuIxhGdk9tkiPAKhjPgjl_rgEi6WYANprRB9wbTxuKjfkLp3A'
    },
    {
      name: '臺南孔廟',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQSyvohHONrwTRUmee1xNHPxpN2uOMFD-lP12QcJ0PXYJkHoKzepzuCu1-w2dG-dPZ5Q1DCmN8gEsiGosnIz1pg2A'
    },
    {
      name: '台江國家公園',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSTD3PFC4S0-y9FP1bc0Aa8wicPF5om50ytp4SxTaO9z8V5qWhCwKPOMzjOU5S_Lokko-WbvMBrhN1VJ9MVrsErOQ'
    },
    {
      name: '關子嶺溫泉',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT6zmBKY35apD5IELtmEnQiNfuCsX3KDcq0CoxBImXrLThiq8EFfkwp50JXr3WHUhZKy4j0LLsFVePgrwNpRpha6g'
    },
    {
      name: '二鯤鯓砲臺(億載金城)',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS7cbdKWCk1KmFVbT0FtO3oEDZKHyfzkfDEv6_xKMpyCpSDBSHjzNvMNdKMZmCVRqSATUk0NwXVTFb1ib3CxiKFig'
    },
    {
      name: '臺南祀典大天后宮',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSTgEIpvP_bpZHDLs38k-edoyJyZuI5ktQOdooKKPKoyCQy_syNcez9WHq2vfkXxLjQCscvCmrP4Nbdb4_SC1s0vQ'
    }
  ],
  'kaohsiung-city': [
    {
      name: '駁二藝術特區',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRm9KphGbJS85wWsdBsg27cSJbi8egxn4peApiwFkZfvxvkytYl4ir_uHooMJ5PKvGLYNoHvX8yl5cCu_ySzr1AZA'
    },
    {
      name: '愛河',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIsxG5CT4GK_KuhBHnGi8lE5EeqAoLQP4PrviVG88nXOpIojo6xvN1sxXHiLB0c61VpamvCWsySgekIMKSPEZatQ'
    },
    {
      name: '佛光山佛陀紀念館',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRrM76bhvgJRRTlqi9XhKz6rIRQpLjZHaKfhCYcEW1TDpeQ0K2DzlCmDhktQMLJvIu2q-B4tmHk8h_u0-5e1LCM_A'
    },
    {
      name: '蓮池潭',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSOvBs7X-Mblm_nT7h09yOTikhpxsl4WuUWMucjJumHHgL6HpdMXOlgyCTy32sPuc0dcBUCzXyYgVhL6GS9uGbhtw'
    },
    {
      name: '瑞豐夜市',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcS0p5Vxjv0aDyV-EFqDEtRVsAG5zRffILlKlssrw_lwqjiaUMrBKriSMvPTfZwVU6SlsAFVfJ6o1YGflJRtrbNyfQ'
    },
    {
      name: '義大遊樂世界',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQo4PEf9cTcvjy09AZK-f-SJLCTH2vs92v6siEmbO_-EqoaB5sRDBHAlUGDljO50ec-_p5hnE_8QVkISGXrNpQFVw'
    },
    {
      name: '高雄市立美術館',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQuZHh6T-U6Gi-dj6goRWhY3zI2N2b31ee7EN8V0cDtdF-gIout9HCuhphRznXD6zSyI8eLqV2lBz97D9J1xD3d_Q'
    },
    {
      name: '打狗英國領事館官邸',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSuh-gMTkLwR81QlGy5wDow401vw7WbnjT9wVcX-U8ycFQlYusxWSGBuyP7uST_fklHX3_PJEnDIS_F3GF3hwsboQ'
    }
  ],
  'yilan-county': [
    {
      name: '太平山國家森林遊樂區',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQrNWA8tUxAbxkA-MYu-RRCpIhaXDjkABfae9ArQFsLFZt0wyQNrYqmVUXXeC3z8G5Hu3ja5iDPLC2eeyNcXNPuIA'
    },
    {
      name: '羅東夜市',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQyNv-1rbc2j3NFBtnRXMkyXStipgfV1CHU3oQ0TBR1r89j0K9X9T70cWI-Drz-_Fn4tvPDF9bZ6S14GnCrfX9Xkg'
    },
    {
      name: '龜山島',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQi6twcWQWMYqOT7fUoOwbEosGv26mYghILJ5urPTmnGkhRu4PyJPNGSwh7P9KDNytOXDg4Apo44uNetebCynXSyA'
    },
    {
      name: '太平山',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTzV4t9WkRNjkIgW9c5SPnfJheDHE0OenQjnLeGuxqo2eEB3IX6umXd1DrWC4o1xLGIBskfye5VFqi6lLUKhY7QGA'
    },
    {
      name: '外澳沙灘',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSUYrxflFyiCJJqtZAnewhg10fH4bXe03Rm4sLA2_IRzgreSGrocAcjvSVypuOYN07JtF56G8_DoYIw4j3uiwLc-w'
    },
    {
      name: '宜蘭傳藝園區',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTxZDgxsjrHV1we68qrTYZ-8_fcU_OEwh60d2kQl4ENhkldYWTozlVEA2afytZLMIHlYg0Dy84iAQT508mTn1VP2Q'
    },
    {
      name: '蘇澳冷泉公園',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSMdmYORti7v4wtCwV4R83bduWgO3oJx_ney8nsitP4N1cRNTT-Xa2j26P6EjozyQHXNm5XQRw4kPXXkZx5d1EBAA'
    },
    {
      name: '冬山河親水公園',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSPHsg-yWuXC3k8d9WrcwEfSxGyCnWnbUK8LP4DcWUZS7ujB58a86GgQDWq2DAtk4GZYgm4Ybp59-6XFj8NL4PnYA'
    }
  ],
  'hsinchu-county': [
    {
      name: '六福村主題遊樂園',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTbSppa5HcylKYGF9w53fAdLBaznANonRFfW1_K4uo0fMr-28uwp7fEgdzke1ywt_3jNy75jurfFbsPJ8cOG3H-_A'
    },
    {
      name: '司馬庫斯',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcT1sHa9iCTBIsM2-d96cCXbieuld5SaBygH_WW8lLop8-Y0l4c0Mu-4-7VRffqKFy-ToQNdrGYcHirYsft3KRmmtA'
    },
    {
      name: '大霸尖山',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRoZLAjQ-UzwqcQPP0Kdw0HamWadC1gBUQh1-py_gUOIsjnZruuQptU_yUrmyhpyhmsG6v8OKPwZ1twEYQB6W0Psw'
    },
    {
      name: '內灣老街',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSKK6zEJyMY-9vhaAyVC5Ic1BABxhRRxwkadFaWxLJd26PnTZc17iaK1tehxnnkh0-c7aNJIhizunt1GwwYGyMx6g'
    },
    {
      name: '雪霸休閒農場',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTbKz0Gqa_s-yaYFUiu-in2NoLuuW-SsZIHMCRoyxHGZJ4U9Mtx33MEX2OQt6zlDWz8MeySLsxGIjLk5kGNrJNqcw'
    },
    {
      name: '北埔老街',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSzStgghyOQV4T1OVtbLYM3zE9KkmoPvfWC3KopZClMU0Xnjjf8l4wI5C3Ib-u5QKwdWRaywizq3gRDg35qPw0t9g'
    },
    {
      name: '綠世界生態農場',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR5DP2EOlkXGhyZiQ915uz9A9IMO7bs3IHUUiW1GA3A77euhk5jA66o9At4278_nvAAEjy_jDY407nS3ycEH0y4og'
    }
  ],
  'miaoli-county': [
    {
      name: '白沙屯拱天宮',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRDdHvoRsQMsWkYe55Zln90JLs-ZMmhpn6eO7RV6Kiy961DwbGaM6xZJTgm7GXDZSv7CJipeJRxb13_r3-YF11Vow'
    },
    {
      name: '飛牛牧場',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTfrlppgknif8pYp7IkzdoDlmockhSxugdgx3BxSfjNSz7A_Z-wh1oG1n0vncn5TzNg5nZUopD5968YtfFiJ7SnFg'
    },
    {
      name: '觀霧國家森林遊樂園',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTuciKMYD3qEqYiTDqP9CA9TM2nKYDNMvGw2aQFvzvFTz9GjgAglbIiM6ZvT4q6n2wXtpM6EkXoWWhva41go9MLGA'
    },
    {
      name: '後龍鎮半天寮休閒文化園區 - 好望角',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSzbCfEosn0oSDbxpoxxK9hOrv4eMsz4LdTxeQFuD-2ONc95NUWoAv6KKt-LyIafDD_Q_qxL6SRyfeR0HL3xDIPVQ'
    },
    {
      name: '龍騰斷橋(魚藤坪斷橋)',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08FQdGbYU-9z8rZQJIUCYYUKUgTMZNypG7pd04R3n1T4HSleEnGxYQxZ9JX0VIhLWrZRlphGbn1OnT6x8K4fNyw'
    },
    {
      name: '九華山大興善寺',
      pictureURL: 'https://lh5.googleusercontent.com/p/AF1QipNjLlNUBdqAyv-ZQ1kY_lPPB0OHHXFGxsnbCptO=w444-h303-n-k-no'
    },
    {
      name: '神仙谷',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTop0vfzDcv9CnvjKAzXgley7XeHkUsm3-FohhZF9iV9-0VHQFEPuZJw3vvOWS_Uqs_8e448dldC1me8FSPyxbydQ'
    },
    {
      name: '泰安竹林秘境',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQEHNC82e0rsDkUtXVDvuUz4MltMFysT2mhsgJcZEHIny6thxbbERmM0xn3CWO9bJOTnAqv5z6lzn-mXRAVAsTjqg'
    }
  ],
  'changhua-county': [
    {
      name: '鹿港老街',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT20byjcJZaqHJFlhGxWoGv1TlsW7k1qboB6I2a35uHnto7HJiwIpuTcqQsewc29ezO7kFaBC75dprMxLrgpgPN3g'
    },
    {
      name: '鹿港天后宮',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ-WQS7Gs9NYw9cZfJ1bvFWgqCKZnsvG_XhSFWFFCZGRvR6rFgi2KQQVPaQBRNsrodjUoneLj5lTEFV_rXxKB7uPw'
    },
    {
      name: '田尾公路花園',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRgT8gKf6LrBwq57ebvietcppmYV74MGuWX-NaO5MU0URk3yGWT59SGHEN1G01_G5jLT-FGuSmuZHl_K9W116ke8A'
    },
    {
      name: '彰化扇形車庫',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRlq6kk-SbNSvwzn-KcQcrWBgG5j9CiocvWQ-OTZ6m4TR552QHan_gF1N2Brr97brqvHdvnFSGM8xp-hAEBBCJHEA'
    },
    {
      name: '鹿港龍山寺',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSG33LvTPLLHhg93QyJQREtvZLhGJYO9C-LKqJF9UMvgcYvFCwLkeST1iskzNAw_kvpTUute-aGEQ3tmqgMdOyrzQ'
    },
    {
      name: '猴探井天空之橋',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQYn-lbThY12ACn1VYpqG2dgavXm_VohOl-lCdEKvv2fC1uAdEQLzx66zXrub1wjVhI67RBnXotFuq6aL-WS2dfYw'
    },
    {
      name: '臺灣玻璃館',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQLSiGExY05AAGJQ7wlbcyqF_XE-OmuRSO15YJAKSw_cF-izNiI4SUQ-d11xfJTPpRfggAF_I5yhGC4PCNkVeRdtg'
    },
    {
      name: '八卦山大佛風景區',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ8YGAfoMBEtD_nEPURoqmE4qSol8Yge2Ym6mWemNTwP73JIzLCsweyIKS9Ul9u7sDiy8iHBUMNJA9l8-S6wJCHYA'
    }
  ],
  'nantou-county': [
    {
      name: '日月潭',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1MGkyoTtOfrQEfX1Fsdy4wnWrqNhQ6_08s6M9KOUnLvR1Zh4N2F6h8xyzU27Mr-_lBoTCyCQngt-JMMNEcScreQ'
    },
    {
      name: '玉山',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcReEiRKiqNvm08tEpWClef0_NDciaE0VDVuKBXDR01Yw7A1Q5J8p32Za1YarVkhNLuzDY48fOuCxYcmJTEZOx3vqQ'
    },
    {
      name: '清境農場青青草原',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRzgmYLEEXaUA66fvpyh5kkiSgGj4GP5Je58z2ivpRRlgUQm8g9yzO6KzLSBWcZONzobBpnz5tjmxjKi_xTNYgkeQ'
    },
    {
      name: '合歡山',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSH0FXkGzcUvEQN-EE-bnyyDTe6l-lE9lA0ER-02Ojk137mEKHfTC-DnKUjPDBnBNeDodHdZ3IToIRiu2AiJCQfWw'
    },
    {
      name: '九族文化村',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9zMubeWNokJEQAAgCoAaf2EKzKrb3Sz4Ve4Tyv8-wM3p9Hq1s7MWGZiqTKK45cLeX4GbvuEwugvWDVdVyDAkwrA'
    },
    {
      name: '日月潭文武廟',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSPn01Xjwl_4b3NoMIO_ZPrK4zODtoEve5paUxrpYvUDA04t6_7g_CIKzw9l0S4uDDs8Ai3WKXPlzI3gQZS5Tynaw'
    },
    {
      name: '溪頭自然教育園區',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQHhVxrh7DSYIcahipz5L4mal6IfTg-_gWxGNbxS-VT6rrKSldAhwxF-6tF_WDsM4ceOVjHOP1gxofaS-NVnkgquA'
    },
    {
      name: '杉林溪森林生態渡假園區',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSmWU4_ic2xvOjGVVKSxWiE0O2TTY5uavZSd74SvbCmsQkMvClSiTlTdq1zqnpt057DIO8lMUt4ceUxzLaP-3eEkw'
    }
  ],
  'yunlin-county': [
    {
      name: '劍湖山世界主題樂園',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQ05fUITm_Dw-xWE60j78eIOVF_P_CU6GSb62lFeHyEeqpLUToq9Zzd2pJVVnn0Fg8DblYHXLN0s_IgSDLp7UZbjw'
    },
    {
      name: '國定古蹟 北港朝天宮',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQFFE8nmtHzzTbjUYShPYUgjI8HcmHs3Q4RQsKZ5k1t4GD9RuyLnWnvDDNsaRwvXyaNBsnyZ6Lvmk8QzqCeIHysjQ'
    },
    {
      name: '古坑綠色隧道公園',
      pictureURL: 'https://lh5.googleusercontent.com/p/AF1QipPiMd4t7e7exYN-LiA5RIa6WwGN501BV5PieLNw=w928-h520-n-k-no'
    },
    {
      name: '北港武德宮',
      pictureURL: 'https://lh5.googleusercontent.com/p/AF1QipM0vM4OEHyNPaynjtOWYIQs6NXAfvegxfa0EP4=w928-h520-n-k-no'
    },
    {
      name: '五元兩角(Five Yuan and Two Jiao)',
      pictureURL: 'https://lh5.googleusercontent.com/p/AF1QipNBMq-6RwZ4YK6tM2wcAtDlXd6Ik2WOJE9MN1JD=w928-h520-n-k-no'
    },
    {
      name: '峭壁雄風',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQzGOj3SR1a7UVsDUtrNi7Qiw33XoSTihPPKSzRgIA0h2lj5zpIBEFzcvJo_m5GhlOmvhdVBIV5YXBL326JOsB7tQ'
    },
    {
      name: '澄霖沉香味道森林館',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQtCx7-z7jY20FErT6QcewFI3uf5U3OljdANox61-CsyRG8IgZ1hVRAqi34yJ5iRv0_07EZausEWsIt2iylkagE2A'
    },
    {
      name: '劍湖',
      pictureURL: 'https://lh5.googleusercontent.com/p/AF1QipNYJ2SniUHES49nmQgbA7pN6tMrIFNdT6-YYuBr=w928-h520-n-k-no'
    }
  ],
  'chiayi-county': [
    {
      name: '國立故宮博物院南部院區',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7BRdxaFDlwe4CEkZQpyX42B7s4FcIGGETFkjV9VE12JcvsX7Tr_1WKL1C7MH7OvWLqityOgZaVrWcVb-wBICJzw'
    },
    {
      name: '太平雲梯遊客服務中心',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcR9SR2COK5zO6X2e9e5ctPfvLMWTqEAVuWICTbXqig7b54UkJURfGIuZTw9RA7jA07b7NRyNwypyMu_M4vF2Ob1Kg'
    },
    {
      name: '曾文水庫',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQ06p29tE-ApZWVavOj2PvNJlPrg56RwpAUUI_mkgd1czV1cmP5lYEP0X1hBlFDfVWN17LHsFmFdpJlYHmj15JI4Q'
    },
    {
      name: '姊妹潭',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcREoFah0p82xl1oNJtLbeQeqmoQ1icBgXVNboavWh7f0sHgkacT8bOo75RKx2cat7Gs27bzx-aeQ3wJXIIwfso51g'
    },
    {
      name: '太平老街',
      pictureURL: 'https://lh5.googleusercontent.com/p/AF1QipObGGboHy3R5mcA3qKL0vO_5Ldjg-nomO5UTmrg=w928-h520-n-k-no'
    },
    {
      name: '新港奉天宮',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRJii1aeOdweHI8aduzWS3U-32VSfhtbuilqnKYjOMzr2ljxSNbyGiSKDdLNlOKoRgdWhCGWy-Y_Hp1oW_An2pBFg'
    },
    {
      name: '巨木群棧道',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcR4Z5MPzLERfhG0ekg-6UXTjXfZWDc9rqP05I9q6Ox0gJs8FyI8Cb7yCk9xN6F4dfQuBotRkOWsOE1yUTUMVHnUKg'
    },
    {
      name: '小笠原山觀景台',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRVpAfuY3K5ssEoiP9fvX-z7EARf55toSNnEWKg4DZDm5MedjoeyVcKvxm5gfY9g5NWjnU8gToUgFv3lqyqAs7cYg'
    }
  ],
  'pingtung-county': [
    {
      name: '國立海洋生物博物館',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaQlxSDR5hOJ4VUvshTsIGtRk5Pk-NIei2Kzr4Dqf0u9QlJWxwq1CFF35cvNM74wBGfyBk7_Ed9R5qvnH_7Ncoqg'
    },
    {
      name: '大鵬灣國家風景區',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRBwxW9OE3KhJjN5soPp26o4mlS4sfr0XfdikOh1f6q0ChkCdq7GmJXslo75bWwxBublg4rdlEPBF5rLTqGtncRMg'
    },
    {
      name: '墾丁國家公園',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTJtwQnasAs4_i2g0V4S_Im5RvmaS0IMkGo9N_7oX_KHWlImY18iR8SUAXb4gn2vJY6KdLdaUpGGOd5eeF2YCzJTQ'
    },
    {
      name: '林後四林平地森林園區',
      pictureURL: 'https://lh5.googleusercontent.com/p/AF1QipN17vLYfx2c5Ze93F--ii35d2I-qPjP0uuo59Af=w696-h390-n-k-no'
    },
    {
      name: '台灣原住民族文化園區',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQUOoHvBNm3u6NPXGfibAU6fKD1aQpfItqdghmk0hj3YBasfwOnUXM0rO4huBKbhUjlJbeAdQe_-Gxzch1pLH0OzQ'
    },
    {
      name: '琉球嶼',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQwmJIqMFx7crkWSCsQ_EGMJwh7uSnEIGXEcpZeJPIqH6suuAOM_JX3hwRuT5U0k0kegsDRi0uawO2gzm7z-If83w'
    },
    {
      name: '鵝鑾鼻燈塔',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYuP5A1Mar9Eu0dRCHx8ogNz-XRAmOHbZeBr43cFtv3h8_k_9CKEw-qJ7J2THAJQGBEFpdJ3bJ_p49IrgY_E39yg'
    },
    {
      name: '墾丁國家森林遊樂區',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ_FAh7Q8NG71DRQjgcU50eYusY38zfg0bElVUHhcwePzdGUjOzFvZAsqUGWpaBrvHoDEoLXWj3fJZbzf6ai4YFEA'
    }
  ],
  'hualien-county': [
    {
      name: '七星潭',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQjUUzwgkl-jjaImLEUi0-6zfc_08pAZJBu6SZPG3T5mimID-fusHEe0DpIx7MT8-YcIpR7F1pkYGkKUykxg-tJoQ'
    },
    {
      name: '清水斷崖',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQRTewzovdI0mWwmjcMnGK-XcsPbIW1E-HOpKx-ecJmQLEgQRbtR_fFF8LnWT_yFrRd-Nrj0ExyL_PXQFtmnIJTgQ'
    },
    {
      name: '長春祠',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQH7sNkI1y5how-jYS3UM8AaefUheSQEy0Eh8qlr-XhHyF0dSkHNmW4Yty44GfyO-tbuI4voKj7hfZwOm6So9q1JQ'
    },
    {
      name: '錐麓古道',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSov8zzrGqlNJ3WFLCWpKDKztJanrLRrUqSYLC28qf7qde4xZBY-MoRk6ObF5fGnnv7FR0wqZ2_JABLwXIpoM4UgA'
    },
    {
      name: '遠雄海洋公園',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT2QxaPsS0xSwulyUqcwMFCxSnJfEBIkdJYrRL8J4ilQFgqCvLdfvdPr_ynwUOb9eSS055aTjH-SNzywbLVfeNCEA'
    },
    {
      name: '鯉魚潭',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSOii3nQ8Ztacu8DpZz5_yHTBRLBvdYcqJ6Yag98qZJDqcmg4GSUO2kc8At8NWiYGxGxRqohjzLo6K769mUOBbUqw'
    },
    {
      name: '燕子口步道',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcR986Mib4y7Gtybz0JcIv2lgRT4SR3DT1N-N0YDgPCq5tNWoTk3PkggzgW5OXMNK_JQSSQWdOGwXP5Nu0Nzgxp-Rw'
    },
    {
      name: '東大門觀光夜市',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSHAV9_RvrIiTgafv7psP-jkW1XDQZkxwu9QXS09kLy_gFEZ1TOYqWyfEURy5v-_Jl1fVRGaJv0L2OiyzdOwrd1iw'
    }
  ],
  'taitung-county': [
    {
      name: '三仙台',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnVibGJXAxMNW9XsPSUJqZ2t_dQId2Herlx0WiqhfeAmBf9Dd3kgw9gpNObmquk271oXZfFzmE9Mc_WV8OVM6yGg'
    },
    {
      name: '臺東森林公園',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA6jQHeMIbsGzOyjNK9zh81j2a4MQWRGXFJ4OrVHkUJI3GrVojVjXKoocXHzGOxp7Kw2AilCW6NDSf4syp374A5w'
    },
    {
      name: '朝日溫泉',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcR4lBrR7j0K3dKvcicp6KrdYn7uy17dXXKcLXwL3SpYjX2t1di-r6xLgqxwecf0yuwmPkoZuIqEjpk6faZV8cIAGw'
    },
    {
      name: '國立臺灣史前文化博物館',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpHEJJpbJwk95aPkYVSXeid8tHE-FXQydxHpcfoKhEuUmKSXMDy1JXRwc8sISMW7nJcMWpVdVBDgflGh8DCNsw6g'
    },
    {
      name: '池上伯朗大道',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSkntsHPdlfl2ZOfHDP7qWuFKRvZTGKexjYqLjvDSRII3N-QU7AhIp95ZvEUTJCar9r1azYo3zDISbglLgebQKG5g'
    },
    {
      name: '鹿野高台',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSehs0tFo608owVg1hWgSsMkjJXA5rUymIprWbfU9nver6aIf6xYJ_DkW8ZEXG0qddNzQkGhOQJDPKcbCgQK6fJ8Q'
    },
    {
      name: '栗松溫泉',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcThK6UV76t66714ji5tLJJlD_NiT7CVfX2FopiH4dVYfxW-s3CQ7b6JxmNSsv9oZLRF1dklr2SmgLHd2kTQK-26fw'
    },
    {
      name: '初鹿牧場',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRpplWXWN6oOhMVhVpKt11F33cOmyiqQPYuumT1BkrCD95x2M1vE-MzKlNLsgDd8ctzqFvr-K8TiTvM-jHfTYAk4A'
    }
  ],
  'penghu-county': [
    {
      name: '山水沙灘',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSRaKSQxZDsaM79eWTKZjTKmnbdpGydd34XcAtU0bZ_OTOKEQMmoSw0nhawuTgub4QtbeTnQrQoufmMjPEhOUcgLw'
    },
    {
      name: '吉貝嶼',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTwOS8t2haweumhs4eZjD8KSEG5rBXH8aSzjT1qjgHGN1MZM3LVjIy_Rr0bxp71YJeP66kkwAenszVI8Le78WVDJA'
    },
    {
      name: '澎湖南方四島國家公園',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcT2-zXIVzdZWVriy8eUT91TzTiZj913dq7NHOJXeEgZBiAt1rJtTas6mvOPdsS-e3JZkTGyFF58U4d_GFrSrZ7J5Q'
    },
    {
      name: '七美雙心石滬',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT6qyBGx92U-sfABmdvp2Xs-BRBPO4LuzK2JIrcalh2nOMq_PpjWDn8fFsnqxEoItNYNDna8MWRmurT0GWMhDEa-Q'
    },
    {
      name: '池東大菓葉玄武岩',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSiqZmnWb2rCkvc6Moyq3KD2THhJODefQalYoYs9mOSMEttcEpLsEYN9C3acvTY8aw3-2Zq1hBWD6jwn6ky82XfIg'
    },
    {
      name: '奎壁山摩西分海',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQd60XvP8S-BwwbllZepFhDgQOYjwuBP-wzFrCuFvaSYQ3ka5leVc1k1QEL5HE90Oe9cuY97kPVZNyRjGNNzl4s2A'
    },
    {
      name: '澎湖跨海大橋',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTA0HnshNRf8UFdquFjA4mF6MSEA00hRlZQNtAysqNBFOc0AIUlW0zS2fLUm9mFmUt2OrAJJZFHyqLLET7CkwUBMQ'
    },
    {
      name: '通樑古榕',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSqL7by2NCf4vsiX45x1fQoJSj7Kj_9z6IzEtS5StzYfOjhXNfXhKNiRmY7rGMWV822yV6nrJkCDGgZ8M8WKgfrnA'
    }
  ],
  'keelung-city': [
    {
      name: '基隆廟口夜市',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTMDr--DGLjSPrIuBn7T2YI6q-qb4sMTKtDsBfo2H_0K_FTCv1W552G9z2yiO0eA7eb_eoLWjjO3b20xduTB8j2LQ'
    },
    {
      name: '潮境公園',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQ4_MIB0nOhYv2GIKkMK5Iin5osJTG-zjVjF-IlFkc-vZrx8752KbA56jABw2JduuX3g2MAlW6fBkXHE4N9wjxnfw'
    },
    {
      name: '和平島公園',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcShHn1HjBbYbUgmYmYZWwKnjUS-DCFZeOZZFeJwEv5glRwCJtEYSjx-uN328yhEp2kFxq4qQuSNM6wTEsYjgT-svg'
    },
    {
      name: '陰陽海',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRNtSHIGzNcbfFGoQtWKU2r8px_ZmwMarnLBHfYSd39aNqcS2EIPEy3MF_zUhPVnRIubh5yROUFDnDcCSs0bO0I8Q'
    },
    {
      name: '國立海洋科技博物館',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSuJjm4xzWZvaWBBC-oig660HGPUVUL-xmXuoactWDcI9UGZyUi4YW1XEScbXsLntikGuq2h0IMS0e5je5FpuGYWw'
    },
    {
      name: '基隆內港',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR91voK_BkLYXTFV0QoUC3YOz8FBbXA0fsvrtr-FAJR7sC6vffpx-ybr_Sg5buqwktijpOYZ-nL501RES8VcPnyCA'
    },
    {
      name: '基隆嶼',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSSxYeqmqF0lxS6T_vMi7achiYFhvhgioJyusSe91csb6FADE3v5pnSv7ccmWin-2agLQ3QwSuHCCjWxTtMpctCAw'
    },
    {
      name: '望幽谷',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcS_3L1hWStjqEUitCOG0M0LOOVMwtD4VdJ038r3ejIK7d_20bcSXWIJYU0oJTBEhcNctXbx776EPRqTFbM6af5bcw'
    }
  ],
  'hsinchu-city': [
    {
      name: '六福村主題遊樂園',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTbSppa5HcylKYGF9w53fAdLBaznANonRFfW1_K4uo0fMr-28uwp7fEgdzke1ywt_3jNy75jurfFbsPJ8cOG3H-_A'
    },
    {
      name: '新竹都城隍廟',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQnYlqMDHvXnfpeAMzarzUjJiJPGeNyvDzuW-woUl0i-XLobu5UpD8FWTwJ5jN5f-xk2PUu8YgV6Ko6B-L-a9Hzrw'
    },
    {
      name: '新竹市立動物園',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSADCL3vPDbTOCiYw8h7Uq-__Nkdnq_gjuZS68n8PGiRvi2BEjS8Sc-09fYhv219DwN3zxIkcxDwOn2_zQN3wWbpA'
    },
    {
      name: '新竹科學工業園區',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQpDZCIHlBjMbXGYsF54zaMMJRyWouKFogxbKqIohsx1cNqF9WLRRDQbNWkN3ZOKTkVCwKloYQ3tvo-7gc2zS7fSA'
    },
    {
      name: '新竹公園',
      pictureURL: 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRponV1IwVVh9g3rew8YUdxKPaKPb5D_e1R5PxVvz8zA7j9xV8Ik6eLcBL9VXLr5MgS4_g9C31jxnobjjONrk4AhA'
    },
    {
      name: '新竹南寮漁港',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTQ2L-nYw8mQ1DjIVB4moD-TqHeIij7gaBEOwQYg7DCs4icvm7k5wiPtS2cHLo9M9qUJK_rZmCkdBS1uQkZGpnnSw'
    },
    {
      name: '青草湖',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSei5Knam9HFV2fk_e9U6yRbFkM4MYMgBNEf-XmZ_DorLxfyxhQO-gHWQdzylsYGcjYSuHF4K8g2vrcvfGn8JLhRw'
    },
    {
      name: '新竹市政府',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSFTwFLOaaYQxWoc1y8HnM6_xgDGXmEZz9pXAoQabTzZ6ITV5iOWgEMowQltZKBK-NWBgOrCxAhdqZ_lZwoRtC8kg'
    }
  ],
  'chiayi-city': [
    {
      name: '檜意森活村',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSmb3-5Yi9MVaPUw4iQ-IYuOUWjyUyL7jBalRtsWe2vPtiQmofypTmSRAo-cijoTb1iv864VXNqEU-cmeKGfI7udA'
    },
    {
      name: '嘉義市文化路夜市',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcT77W8Pchjkqjf3AGkIFTaY2YYfJLnuHm0F84_2WFSpkuTVHlIqw8NkcmuH21akRaFZzfCrzdtW5kQKx2Z0Pq1xVQ'
    },
    {
      name: '嘉義公園',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTBagFNl1huQq-bK1CPYI7_riJm7TJDu9u94prQSstv7LC3jeAh16WcLHx8YdHjDCW_fFnS-Rcj0FUWVxFZxw0yXA'
    },
    {
      name: '臺灣花磚博物館',
      pictureURL: 'https://lh5.googleusercontent.com/p/AF1QipNsNDiYSkhlBuXisuK_aW_QUMkz_lPOPIcX6EfC=w928-h520-n-k-no'
    },
    {
      name: '蘭潭水庫',
      pictureURL: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT4dWWrDigbc9nym2VjwtvoxtMq1hma-fgenc77REJkhiLVfBMwvd_03X-PkXBxKl_a2Y1KxtNKqSWIUUprgUCllw'
    },
    {
      name: '阿里山森林鐵路車庫園區',
      pictureURL: 'https://lh5.googleusercontent.com/p/AF1QipNDqcwC_kOF0nMi5Ql5fg9m8YLPMb4fUzMryAYw=w928-h520-n-k-no'
    },
    {
      name: '森林之歌',
      pictureURL: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRfQemnEhgVsSGkhz1V-V5r92er4Zbx3YdtM0YIbei17DEmm3t8UFGdWrcl_8mL7RLqP0kAOciQsv3AooUDzm4xEA'
    },
    {
      name: '國定古蹟-嘉義舊監獄',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSI1oBp2yn-MKCoGRr-ddX6Czs0o3ZVVJcM59Wi5mNw1IbW3OtLNNIPrXSe_2DdqQMXJ8mcagri-bFyl1QL3hNKPQ'
    }
  ]
}

export default defaultAttractions
