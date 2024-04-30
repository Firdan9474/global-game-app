// pop up scrooll up

document.addEventListener("DOMContentLoaded", function() {
    var scrollUpPopup = document.getElementById('scrollUpPopup');
  
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        scrollUpPopup.classList.add('active');
      } else {
        scrollUpPopup.classList.remove('active');
      }
    });
  
    scrollUpPopup.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });







// menu

const tombolMenu = $(".tombol-menu");
const menu = $("nav .menu ul");

function klikMenu(params) {
    tombolMenu.click(function (params) {
        menu.toggle();
    });
    menu.click(function (params) {
        menu.toggle();
    });
}
$(document).ready(function(params) {
    let width = $(window).width();
    if (width < 999) {
        klikMenu();
    }
});

// check lebar
$(window).resize(function (params) {
    let width = $(window).width();
    if (width > 989) {
        menu.css("display", "block");
    }else{
        menu.css("display", "none");
    }
    klikMenu();
});

// efek scrol down
$(document).ready(function(params) {
    let scroll_pos = 0;
    $(document).scroll(function(params) {
        scroll_pos = $(this).scrollTop();
        if (scroll_pos > 0) {
            $("nav").addClass("putih");
            $("nav img.black").show();
            $("nav img.putih").hide();
        }else{
            $("nav").removeClass("putih");
            $("nav img.black").hide();
            $("nav img.putih").show();
        }
    })
});

$(document).ready(function() {
    let scroll_pos = 0;
    const spanTag = $("nav .menu ul li span");

    $(document).scroll(function() {
        scroll_pos = $(this).scrollTop();
        if (scroll_pos > 0) {
            spanTag.addClass("scrolled");
        } else {
            spanTag.removeClass("scrolled");
        }
    });
});

// end efek scrol

// script EDA and Modelling

// Fungsi untuk menyalin teks ke clipboard dan menampilkan ikon cek pada tombol yang ditekan
function copyToClipboard(text, copyButton) {
    var tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    var icon = document.createElement('i');
    icon.classList.add('fas', 'fa-check');
    copyButton.innerHTML = '';
    copyButton.appendChild(icon);

    setTimeout(function() {
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    }, 2000); 
}

// Menambahkan event listener untuk tombol pada bagian Persiapan Data
document.getElementById('copyButton-data-preparation').addEventListener('click', function() {
    var responseText = "df_video_game_dc = df_video_game_og.copy()\n"+
    "df_video_game_dc.info ()\n"+
    "df_video_game_dc ['Critic_Score'] = pd.to_numeric (df_video_game_dc['Critic_Score'], errors='coerce').fillna(0).astype(int)\n"+
    "df_video_game_dc ['Critic_Count'] = pd.to_numeric (df_video_game_dc['Critic_Count'], errors='coerce').fillna(0).astype(int)\n"+
    "df_video_game_dc ['User_Score'] = pd.to_numeric (df_video_game_dc['User_Score'], errors='coerce').fillna(0).astype(int)\n"+
    "df_video_game_dc ['User_Count'] = pd.to_numeric (df_video_game_dc['User_Count'], errors='coerce').fillna(0).astype(int)\n"
    ;
    copyToClipboard(responseText, this); // 'this' mengacu pada tombol yang ditekan
});

// Menambahkan event listener untuk tombol pada bagian Analisis dan Pemodelan Eksplorasi (deskriptif)
document.getElementById('copyButton-eda-1').addEventListener('click', function() {
    var responseText = "df_eda = df_video_game_dc.copy()\n"+
    "df_eda.describe().transpose()\n";
    copyToClipboard(responseText, this); // 'this' mengacu pada tombol yang ditekan
});

// Menambahkan event listener untuk tombol pada bagian Analisis dan Pemodelan Eksplorasi (tren penjualan)
document.getElementById('copyButton-eda-2').addEventListener('click', function() {
    var responseText = "sales_per_year = df_eda.groupby('Year_of_Release')['Global_Sales'].sum().reset_index()\n"+
    "total_sales = sales_per_year['Global_Sales'].sum()\n"+
    "sales_per_year['Global_Sales_Percentage'] = (sales_per_year['Global_Sales'] / total_sales) * 100\n"+
    "sales_per_year['Global_Sales_Percentage'] = sales_per_year['Global_Sales_Percentage'].round(2)\n"+
    "print(sales_per_year)\n"+
    "grand_total_sales = round(sales_per_year['Global_Sales'].sum())\n"+
    "grand_total_sales_percentage = round(sales_per_year['Global_Sales_Percentage'].sum())\n"+ 
    "print('Grand Total Penjualan Global:', grand_total_sales)\n"+
    "print('Grand Total Persentase Penjualan Global:', grand_total_sales_percentage)\n";
    copyToClipboard(responseText, this); // 'this' mengacu pada tombol yang ditekan
});

// game per region
document.getElementById('copyButton-eda-3').addEventListener('click', function() {
    var responseText ="df_filtered = df_eda[(df_eda['Year_of_Release']= 2013) & (df_eda['Year_of_Release'] <= 2016)]\n"+
    "grouped_sales = df_filtered.groupby('Name').agg({ 'NA_Sales': 'sum',\n"+
    "'EU_Sales': 'sum',\n"+
    "'JP_Sales': 'sum',\n"+
    "'Other_Sales': 'sum'\n"+
    "}).reset_index()'\n"+
    "top_games_na = df_eda.nlargest(3, 'NA_Sales')\n"+
    "top_games_eu = df_eda.nlargest(3, 'EU_Sales')\n"+
    "top_games_jp = df_eda.nlargest(3, 'JP_Sales')\n"+
    "top_games_other = df_eda.nlargest(3, 'Other_Sales')\n"+
    
    "print('Top 3 games with the most sales in each region from 2013 to 2016:')\n"+

    "print('NA:')\n"+
    "for index, row in top_games_na.iterrows():\n"+
    "print(f'\t{row['Name']} - {row['NA_Sales']:.2f} million dollars')\n"+

    "print('EU:')\n"+
    "for index, row in top_games_eu.iterrows():\n"+
    "print(f'\t{row['Name']} - {row['EU_Sales']:.2f} million dollars')\n"+

    "print('JP:')\n"+
    "for index, row in top_games_jp.iterrows():\n"+
    "print(f'\t{row['Name']} - {row['JP_Sales']:.2f} million dollars')\n"+

    "print('Other:')\n"+
    "for index, row in top_games_other.iterrows():\n"+
    "print(f'\t{row['Name']} - {row['Other_Sales']:.2f} million dollars')\n";
    copyToClipboard(responseText, this);
});
// publisher
document.getElementById('copyButton-eda-4').addEventListener('click', function() {
    var responseText = 
    "df_filtered = df_eda[(df_eda['Year_of_Release']= 2013) & (df_eda['Year_of_Release'] <= 2016)]\n"+
    "sales_publisher = df_filtered.groupby('Publisher').agg({'Global_Sales': pd.Series.sum})\n"+
    "top_publishers = sales_publisher.nlargest(5, 'Global_Sales')\n"+
    "print('Top 5 publishers with the most global sales from 2013 to 2016:')\n"+
    "print(top_publishers)\n";
    copyToClipboard(responseText, this);
});
document.getElementById('copyButton-eda-5').addEventListener('click', function() {
    var responseText =
    "df_filtered = df_eda[(df_eda['Year_of_Release']= 2013) & (df_eda['Year_of_Release'] <= 2016)]\n"+
    "sales_genre = df_filtered.groupby('Genre').agg({'Global_Sales': pd.Series.sum})\n"+
    "top_genres  = sales_genre.nlargest(5, 'Global_Sales')\n"+
    "print('Top 5 Genres with the most global sales from 2013 to 2016:')\n"+
    "print(top_genres)\n";
    copyToClipboard(responseText, this);
});
document.getElementById('copyButton-eda-6').addEventListener('click', function() {
    var responseText =
    "df_filtered = df_eda[(df_eda['Year_of_Release']= 2013) & (df_eda['Year_of_Release'] <= 2016)]\n"+
    "sales_game = df_filtered.groupby('Name').agg({'Global_Sales': pd.Series.sum})\n"+
    "top_names  = sales_game.nlargest(5, 'Global_Sales')\n"+
    "print('Top 5 Games with the most global sales from 2013 to 2016:')\n"+
    "print(top_names)\n";
    copyToClipboard(responseText, this);
});


