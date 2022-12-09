const defaultAttractions: { [key: string]: Array<{ name: string, pictureURL: string }> } = {
  'taipei-city': [
    {
      name: '台北車站',
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDyvP-V4HuzHRFE-lDRTZw7GvQBUAfOJ5o7A7xrbA3C9HXLiQMw7lBDA1vTo2j3okiG1o9AcA6DTcpadfJOL0hfzL_rdfVICU_gJvaJ_EuDpMtFVbXHVxqiA4n30-bVUrmOetjP10TNmjp_IQiy4v-rv03FXPeh6AokxDpbPkocCNV_H&key=${API_KEY}`
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
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDzR6bi9QGs3h3ERK07svGAMzU4nxDparMQsB37UaTiRXx6uUKDhqu-LQ4CEjweN7YOf4DBkjHmBB-L9RO-NPWpgTTEwYDzUDcf2gywQIUeiJKcNBPDrcm88YmFredLE2YCagq4MumRPnbHwM2WKjcI3UTK45fbh4rpGWibmx_qi96xP&key=${API_KEY}`
    }
  ],
  'taichung-city': [
    {
      name: '台中一中',
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDzo4B4XwXW9x0nWhnJ7MFENXmj_Go53EdAUDw9vr9P9rc1XYFLWySkSD5SrpjoJmcUUqtXxEEtNbgdQ1E28Svkv6_gzj0p7H_oGptBhBZyHsSI4LdT0dJELHt0ZFIHldjP8MrW_oy8agQIPw0lg2d1DX31H6Eeja9V9jTSTQQ74TF2y&key=${API_KEY}`
    },
    {
      name: '台中火車站',
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDzr3_oVvbx_gTyyYvYoqAq64lXrKcK8BUraM8yPFwcLE7rWjKpNKjrAZ8VH0PrELUeMhKuqCGN7NpT6L4pRGTXT4EEYr4JA4wf6y5r9zBop_bbKQaCWW16eiF2ZdgSRy1GqoEd5T0SauScL3FgGoDfCVHqtw42X7YaunbATEoKTcD7A&key=${API_KEY}`
    },
    {
      name: '早溪夜市',
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDyOKJEQmOGd0XTF8A449ffp0VNJ94czFN_L9zYSZN9hwdXLrQ0hRUPjgLhm09wvUEro2Iu4YrEhE7-qxxATX6KCfelD2Do2ItAxk6ZVtzp3VVOiGkpkC3LHSic9HCF2AlL47ooFKFjJsDtNGK_8twgUQ5ygAI9_CFkrx2t6Xgb9Qlan&key=${API_KEY}`
    },
    {
      name: '宮原眼科',
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDzT1YRFenSZ_EASMzaIaA9mUZy5UeIDgo9PcAIDT2KmROF214kOqTmq6GijtcSARVKGcy5OkSVF-qzmiHenCYzPOd6Ncc4lNiQT_UH6AR3KFJXmrE6nz4GXASkOyY2Nmkqml7jzw0b5vtwD2KuX-7z17mabPB6sQNCqocQveCF2p53P&key=${API_KEY}`
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
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDxSX8oFEEfzllrRFmhZjTqO-12zf1lkR8FKrYhv7TGHurSBTeipaVGKXKsHAw7rH35SX58GkgCPxTC4IMrDFrrrjjdj8KTldT9Btq0EDnEeV3ev8Y2lkngzTZ3_aAsVBwod-PR8SujHUPw3vASzAWX9mm4y4fRYn1vqx91Y_IP3CwQj&key=${API_KEY}`
    },
    {
      name: '美崙夜市',
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDy9Q-Ntgch-UMXkPDHjSSeKoOA-vC04zL0lsiDdgo89NeZ8dktBqZpvayXs_BL4AE210Hv2pm0h0tD1lsBmaH80umm6ZM__Rafq2-mc590mgwngwnQELcRFWrz5FkiJEkmw4vT1tBml2gPsvBc4xFRxGoRo4JIJYjJyAWiJSh2zSAhH&key=${API_KEY}`
    },
    {
      name: '原野牧場',
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDwC42IYuJPEO5k7ZxteAr2Ul2XKWn6Ly7oZTX6Due9Vr0KzYcB_MULQtOIHJVXScZZweS2XKqXeaVFF0As35qqviI2B_WU_L8rNV_n1GIAUp8IA9D7qAsROq3MRK9HPGd6hQaf1yvs3LX5hMkQZQUmjKzB3gL66RwEnYN7WxIu6uLau&key=${API_KEY}`
    },
    {
      name: '國定古蹟-嘉義舊監獄',
      pictureURL: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSI1oBp2yn-MKCoGRr-ddX6Czs0o3ZVVJcM59Wi5mNw1IbW3OtLNNIPrXSe_2DdqQMXJ8mcagri-bFyl1QL3hNKPQ'
    }
  ]
}

export default defaultAttractions
