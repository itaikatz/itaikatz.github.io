@echo off
for /l %%x in (0, 1, 8) do (
   echo %%x
   python lsb_insert.py lena.jpg mandrill_orig.jpg %%x lsb_%%xbits.jpg
   rem copy %%x.txt z:\whatever\etc
)


rem python lsb_insert.py lena_128_colors_dither.png mandrill_orig.jpg 1 lsb_1bits.jpg
rem python lsb_insert.py lena_64_colors_dither.png mandrill_orig.jpg 2 lsb_2bits.jpg
rem python lsb_insert.py lena_32_colors_dither.png mandrill_orig.jpg 3 lsb_3bits.jpg
rem python lsb_insert.py lena_16_colors_dither.png mandrill_orig.jpg 4 lsb_4bits.jpg
rem python lsb_insert.py lena_8_colors_dither.png mandrill_orig.jpg 5 lsb_5bits.jpg
rem python lsb_insert.py lena_4_colors_dither.png mandrill_orig.jpg 6 lsb_6bits.jpg
rem python lsb_insert.py lena_2_colors_dither.png mandrill_orig.jpg 7 lsb_7bits.jpg