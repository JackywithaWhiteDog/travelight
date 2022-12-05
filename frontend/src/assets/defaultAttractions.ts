const API_KEY = (process.env.REACT_APP_GOOGLE_MAPS_API_KEY === undefined) ? '' : process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const defaultAttractions: { [key: string]: Array<{ name: string, pictureURL: string }> } = {
  'taipei-city': [
    {
      name: '台北車站',
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDyvP-V4HuzHRFE-lDRTZw7GvQBUAfOJ5o7A7xrbA3C9HXLiQMw7lBDA1vTo2j3okiG1o9AcA6DTcpadfJOL0hfzL_rdfVICU_gJvaJ_EuDpMtFVbXHVxqiA4n30-bVUrmOetjP10TNmjp_IQiy4v-rv03FXPeh6AokxDpbPkocCNV_H&key=${API_KEY}`
    },
    {
      name: '西門町',
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDy73_uguOtTfzh0CJsJu0a3FBVhuK32LCbUEciNovW03p8fqTVY7vlQC7wN2_nQQV3YnPekDq4o6_83EWg0YYN5Yza8O3gXp8RAdDYbzbatoj6ZeMP3vgJs0FH91PmAg-rPVMKzwkn7PEOg-tqAco_l2OJOgV9jwgbB_6HxFj6xtYDN&key=${API_KEY}`
    },
    {
      name: '台北101',
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDyp9NIg5rPlcc_X_ORtNKGWg5qy-owhYehxfwIYKyvPDogCqKd-iweeT-WWH4LhvGJIi7ltDAf5NGKfrFCJRVswnpXKpaUBHaK_HJvWd73fKsZS82CnrKrUFPICSuUaz6bSKlwMrRk-A61LOz8Vdy94mG8gd425grJDR6nOa5qCIzYa&key=${API_KEY}`
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
      name: '光復糖廠',
      pictureURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=AW30NDw7nQBHKGSsHYWRomIR2IZdUuIY79kyGYNCQyRl0M1rrBkpFedH1vQBmDHvIo6ukJKmfj95gW0am_xiayb5q67lWC63RGvF2v7hrCcYdKJZixKh-VNcxUjTi9up10GI4XcGyOGGfXJI-9sAsQgrsHh6JnFfUeKc5QmXU_bgklnjOf3R&key=${API_KEY}`
    }
  ]
}

export default defaultAttractions
