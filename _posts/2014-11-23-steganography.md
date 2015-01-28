---
title: Steganography
publish_title: "In plain sight: A survey of steganography techniques (Part I)"
category: tutorial
layout: blog_post
thumbnail: assets/thumbnails/steg.jpg
js: steg.js
---

In plain sight: A survey of staganography techniques (Part I)
==

<img src="{{site.baseurl}}assets/posts/steganography/montage2.jpg" alt="My Image" />

The past decade has seen an information explosion of unprecedented magnitude. The internet and high-density storage media have made data transfer fast and often anonymous. When we want to keep our data a secret there are lots of standard encryption techniques. One of these, AES-128 will take a string of text:

> This is the dawning of the age of Aquarius. 

And convert it into this:

> m8ZPh0WFI/9MH6HN2LVnSxhaVDQ8ftO391WjvCxKGbJWf+fztbIqnIVzyXpCaXTJP9PuP7h7bHrjQZQK
> 1YthDvbUy41Sap/w79dB41sQDPccJw5DdAIBI/soq3oRY773pWMVCdV0G+tp5x9OGGovLg==


This works great for ensuring the security of our data but the obvious problem is that it's, well, obvious. Anybody who's worked with encrypted data before can recognize a psuedo-random string like the one above and know that somebody's passing secrets. What if we could hide our secret in such a way that a third party wouldn't even know it's there? This is the concept known as **steganography** from the Greek words *steganos* and *graphein*, meaning "concealed writing".

Steganography has a rich and sometimes disturbing history. It was particularly useful in wartime, most famously by prisoners of war sending covert messages back to their command. In 1966 American POW Jeremiah Denton blinked the word "T-O-R-T-U-R-E" in Morse code during a televised press conference. Later in 1968, after the crew of the USS Pueblo were held as prisoners by North Korea, they flashed what they claimed is a "Hawaiian good luck" sign during staged propaganda photos (see below).

<div class="imageTable">
    <table>
        <tbody>
            <tr>
                <td>
                 	<img src="{{site.baseurl}}assets/posts/steganography/moRy14.gif" alt="My Image" />
                	<div class="caption">		
    	            	American POW Jeremiah Denton blinking in Morse code.
                	</div>
               </td>
                <td>
                	<img src="{{site.baseurl}}assets/posts/steganography/img0273.png" alt="My Image" />                	
                	<div class="caption">
                		USS Pueblo POWs flashing a "Hawaiian good luck" sign
 	               	</div>
                </td>
            </tr>
		</tbody>
	</table>
</div>
(convert this link to a gif: https://www.youtube.com/watch?v=BgelmcOdS38)

Today modern steganography has entered the information age. In the rest of this tutorial we'll describe several algorithms to digitally hide one message inside another. For simplicity, we'll conceal one (payload) image inside another (target) image. These techniques can be generalized to different types of data such as text or audio. We'll conclude with several real-world applications.

Requirements
--
The primary goal of an stegonagraphic algorithm is *impercebility* that is, the payload image should be completely hidden from any casual observer who views the target image. The exact methods defer but in general the idea is to exploit weaknesses in the human visual system. The algorithms implemented here are evaluated with the following considerations:

* Robustness. The payload image should be recoverable in the presence of image manipulation. This includes both unintentional (e.g. noise) and intentional (e.g. cropping, resizing, or compression).
* Transparancy. The algorithm should have little perceptible effect on the quality of the target image.
* Capacity. The amount of data an algorithm can embed in an image has implications for what sort of data can be hidden.

Let's begin with the simplest and oldest technique, Least Significant Bit (LSB) Insertion.

### Least Significant Bit (LSB) Insertion

(This section adapted from a post on Nick Berry's excellent blog, DataGenetics[^foot1])

LSB insertion is the simplest, earliest watermarking algorithm. It exploits the fact that while typical computer images exhibit a wide range of colors (approximately 16.7 million for a 24-bit image), humans can only distinguish a small fraction of this range.

<div class="row">
	<div class="medium-6 small-12 columns">		
		When we see an image on a screen, we see something like this:
		<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/Eye_of_Horus.svg" />
	</div>
	<div class="medium-6 small-12 columns ">	
		but inside the computer the image is represented differently:
		<img src="{{site.baseurl}}assets/posts/steganography/pixels.svg">
		<!--<img src="your.svg" onerror="this.src='your.png'">-->
		<!-- <img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_0.jpg" /> -->
	</div>
</div>	

In the case of the monochrome image above, the pixels are represented as a grid of ones and zeros (for white and black, respectively). In a color image, each pixel is typically represented with a string of 24 bits: 8 each for the <span style="color: red">red</span>, <span style="color: green">green</span>, and <span style="color: blue">blue</span> channels. Together these result in $$2^\color{red}{8} \times 2^\color{green}{8} \times 2^\color{blue}{8} = 16777216$$ colors. However, the human eye is inefficient at distinguishing similar shades. Consider the following four shades of blue, represented here as binary RGB values:

<div class="row">
	<div class="small-6 medium-3 columns" style="background-color: rgb(30, 30, 128); text-align: center; border-right: 1px solid gray;">	
		$$ \begin{align*}
			R &= (0001 111\underline{0})_2\\
			G &= (0001 111\underline{0})_2\\
			B &= (1000 000\underline{0})_2
		\end{align*} $$
	</div>
	<div class="small-6 medium-3 columns" style="background-color: rgb(30, 30, 129); text-align: center; border-right: 1px solid gray;">	
		$$ \begin{align*}
			R &= (0001 111\underline{0})_2\\
			G &= (0001 111\underline{0})_2\\
			B &= (1000 000\underline{1})_2
	\end{align*} $$
	</div>
	<div class="small-6 medium-3 columns" style="background-color: rgb(30, 30, 130); text-align: center; border-right: 1px solid gray;">	
		$$ \begin{align*}
			R &= (0001 111\underline{0})_2\\
			G &= (0001 111\underline{0})_2\\
			B &= (1000 001\underline{0})_2
		\end{align*} $$
	</div>
	<div class="small-6 medium-3 columns" style="background-color: rgb(30, 30, 131); text-align: center">	
		$$ \begin{align*}
			R &= (0001 111\underline{0})_2\\
			G &= (0001 111\underline{0})_2\\
			B &= (1000 001\underline{1})_2
		\end{align*} $$
	</div>
</div>

Each of these segments is separated by a single shade. Can you spot the difference? Although the LSBs (the underlined bits in the example above) are different in each shade, they don't have much perceptible effect.  Exploiting this limitation allows us to insert secret data into our image. For example, to store a hidden bit of $$\textbf{1}$$ we set the LSB of a particular byte to one. Similarly, to store a zero we set the LSB of the same byte to zero. Repeating this for each pixel allows us to store an entire secret image inside our target image. Here's what the result looks like:

<div class="row" style="display: table-cell; vertical-align: middle;">
	<div class="small-3 small-offset-1 columns" style="position: relative; top: 50%; transform: translateY(25%);">
	    <img src="{{site.baseurl}}assets/posts/steganography/lena_0.jpg" alt="My Image" />
	    Target image
	</div>
	<div class="small-3 columns" style="position: relative; top: 50%; transform: translateY(25%);" >
	    <img src="{{site.baseurl}}assets/posts/steganography/mandrill_orig.jpg" alt="My Image" />
	    Secret image
	</div>
	<div class="small-4 columns end">
	    <img src="{{site.baseurl}}assets/posts/steganography/hidden.jpg" alt="My Image"  style="border-left: 2px solid white;" />
	    Secret image inserted into target
	</div>
</div>

Now we're not restricted to using the *least* significant bit. If we want to insert a larger secret image a greater portion of the target image can be overwritten with our secret data, using the least *two* significant bits and so on. This process can be repeated for quite a number of bits before the image begins to degrade pereptually. How many bits can we overwrite in the image below before you start noticing any noise?

<!--
<div class="row"> 
<div class="small-10 medium-11 columns"> 

	<div class="range-slider" data-slider data-options="display_selector: #sliderOutput3;"> 
		<span class="range-slider-handle" role="slider" tabindex="5"></span> <span class="range-slider-active-segment"></span> 
	</div> 


		<div class="small-2 medium-1 columns"> <span id="sliderOutput3"></span> </div> 
</div>
</div>
-->


<div class="row" id="lsbSliderDiv" style="position:relative;">
	<div class="small-3 columns" style="text-align: left;">
		<img src="{{site.baseurl}}assets/posts/steganography/lena_0.jpg" style="width:75%; margin-bottom:10px;" alt="My Image" id=
		"lsbSliderSource" /> <br/>
		<img src="{{site.baseurl}}assets/posts/steganography/mandrill_orig.jpg" style="width:75%; " alt="My Image" id=
		"lsbSliderTarget"/>
	</div>
	<div class="small-4 columns">
	    <img src="{{site.baseurl}}assets/posts/steganography/lena_0.jpg" alt="My Image"  id="lsbSliderImage" />


		<div class="range-slider round" data-slider data-options="start: 1; end: 8; initial: 1; display_selector: #sliderOutput3;" id="lsbSlider">
      		<span class="range-slider-handle" role="slider" tabindex="0"></span>
      		<span class="range-slider-active-segment"></span>
    	</div>
    	 <div class="small-2 medium-1 columns">
  		  <span id="sliderOutput3"></span>
  		</div>

  </div>
  <div class="small-4 columns end" id="lsbSliderNotes"></div>
  </div><center> </center>

<!--
<ul class="accordion" data-accordion>
  <li class="accordion-navigation">
    <a href="#panel1a">Accordion 1</a>
    <div id="panel1a" class="content active">
      Panel 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
  </li>
  <li class="accordion-navigation">
    <a href="#panel2a">Accordion 2</a>
    <div id="panel2a" class="content">
      Panel 2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
  </li>
  <li class="accordion-navigation">
    <a href="#panel3a">Accordion 3</a>
    <div id="panel3a" class="content">
      Panel 3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
  </li>
</ul>
-->

<!--
		<div class="range-slider round" data-slider>
  			<span class="range-slider-handle" role="slider" tabindex="0"></span>
  			<span class="range-slider-active-segment"></span>
  			<input type="hidden">
		</div>

	</div>
</div>

-->

Despite excellent capacity and ease of implementation, LSB insertion suffers from several problems. First, it treats all parts of the image equally. Localizing the watermark in high-frequency regions would produce a more visually pleasing result. Second, LSB insertion is the least robust of all methods. It does not survive any sort of image manipulation, in particular JPEG compression. This is an example of a "fragile watermark".

NOTES
==
To-Do:

LSB:
* slider notes for varying bits in LSB
* limitations of lsb
 
Spatial domain

Additional applications

Motivation
--



Watermarking is not a new phenomenon. For nearly one thousand years, watermarks on paper have been used to identify a particular brand (in the case of publishers) and to discourage conterfeiting (in the case of stamps and currency) [11]. In the modern era, proving authenticity is becoming increasingly important as more of the world's information is stored as readily transferable bits. Digital watermarking is a process whereby arbitrary information is encoded into an image in such a way that the additional payload is imperceptible to the image observer.

The purpose of this project is to document the development of digital watermarking algorithms through implementations. I am especially interested in how the human visual system can be exploited to increase payload capacity and decrease perceptibility.

The watermarking algorithms implemented in this project are evaluated with the following considerations:

* Robustness. A robust watermark will be recoverable in the presence of image manipulation. This includes both unintentional (e.g. noise) and intentional (e.g. cropping, resizing, or compression).
* Transparancy. A transparent watermark will have little effect on the image quality.
* Capacity. The amount of data an algorithm can embed in an image has implications for how the watermark can be applied. 

Background
--

The past decade has seen an information explosion of unprecedented magnitude. The internet and high-density storage media have made data transfer fast and often anonymous. These developments make it difficult to track how data is distributed. Watermarks embedded within an image enable one to trace an image back to its source despite having a minimal impact on the end user.

Watermarks have a number of applications:

* Establishing ownership by embedding identifying data.
* Tracking the movement of authorized copies by embedding a unique serial number in each copy.
* Attaching meta-data that pertains to the image such as a time, date, and location stamp. 

Watermarking algorithms fall into two categories. Spatial-domain techniques work with the pixel values directly. Frequency-domain techniques employ various transforms, either local or global [9]. The following describes several popular techniques. (More detailed descriptions of LSB, BPCS, ABCDE, spread spectrum, and IA-DCT are described in the "Methods" section.)

### LSB insertion
LSB insertion is one of the simplest techniques and has been known since antiquity (~1980s). Given an 8-bit image, the least signicant bits are replaced with meaningful data. Since only the lower-order bits are altered, the resulting color shifts are typically imperceptible. [4]

### Masking
Luminance values are modified so as to make a visible pattern on the image. Since the watermark is plainly visible, this is often used in stock photography to discourage unauthorized commercial use of an image. [4] 

<img src="{{site.baseurl}}assets/posts/steganography/mask.jpg" alt="My Image" />

### Palette Sorting
Some image formats, such as GIF, have each pixel index into a color palette, which is a small subset of the total number of viewable colors. By intelligently reordering the palette, one can arrange like colors to be near each other in index value. Data is then embedded in a similar manner as LSB insertion. This method is efficient for grayscale images, which have a narrow range of colors.
A grayscale palette sorted by luminance [4]

<img src="{{site.baseurl}}assets/posts/steganography/palette.jpg" alt="My Image" />

### Bit-Plane Complexity Segmentation (BPCS)
BPCS embeds watermark data only in "complex" regions of an image. The resulting watermark is localized on less conspicuous edges and noise-like regions while avoiding regions of flat color. [6]

### A Block Complexity based Data Embedding (ABCDE)
ABCDE extends BPCS by adopting a more sophisticated metric for determining the complexity in an image region. [5]

### Spread Spectrum
Spread spectrum is a frequency-domain method that takes the DCT transform of the image and adds a series of random values to the high-energy coefficients. These random values form a unique fingerprint that can be used to identify an image. Unlike the previously mentioned methods, spread spectrum does not allow insertion of arbitrary data. [2]

### Image Adaptive Discrete Cosine Transform (IA-DCT)
IA-DCT extends spread spectrum by accounting for locally varying image features. Instead of a global DCT, as in spread spectrum, IA-DCT separates the image into 8x8 tiles and inserts watermark data with a power proportional to the "complexity" of the tile. [9]

Steganography is a related field which attempts to attach information covertly such that hidden messages are not only encrypted, but undetected. Steganography differs from watermarking in several key ways. Watermarking only demands that the hidden data is undetectable to the eye; statistical analysis should reveal the presence of a watermark. Steganography assumes the end user is an adversary who may attempt to modify or remove the hidden message, should it be detected. In most applications, the end user can be aware of the presence of a watermark without compromising its usefulness.


Methods
--

### Least Significant Bit (LSB) Insertion 

LSB is the simplest, earliest watermarking algorithm. For each pixel, the least significant bit is overwritten with one bit of the watermark message. For example:

"the letter A can be hidden in three pixels (assuming no compression). The original raster data for 3 pixels (9 bytes) may be

    (00100111 11101001 11001000)
    (00100111 11001000 11101001)
    (11001000 00100111 11101001)

The binary value for A is 10000011. Inserting the binary value for A in the three pixels would result in

    (00100111 11101000 11001000)
    (00100110 11001000 11101000)
    (11001000 00100111 11101001)" [4]

This takes advantage of the human visual system's inability to pick out very similar colors. Because of the large number of available colors in an uncompressed image, a substitution of adjacent colors will be undetectable.

The images below show the result of LSB insertion on various numbers of lower order bits. The same number of bits were modified for each RGB channel. For the watermark, a string of random bits were used. While the embedded message can take any form, one with a high degree of structure may create artifacts in the final image. For this reason messages should be encoded into an apparently-random string of bits (such as through MIME encoding).

Two measurements were taken, embedded capacity and PSNR.

$$ \text{embedded capacity} = \frac{\text{# embedded bits}}{\text{image size}} $$

$$ \begin{align*}
MSE  &= \frac{\sum[f(i,j)-F(i,j)]^2}{N^2}\\
PSNR &= 20\log_{10}{\frac{255}{\text{RMSE}}}\\
\text{where RMSE} &= \sqrt{MSE}
\end{align*} $$


<div class="imageTable">
    <table>
        <tbody>
            <tr>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_0.jpg" />  
                	<!--<div class="caption">Original image<br><br></div>                 -->
                	<div class="caption">                	
                		Original image<br>
                		<br>
                		<br>
                	</div>
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_1.jpg" />    
                	<div class="caption">
                		1-bit distortion<br>
                		capacity: 12.5%<br>
                		psnr: 51.14
                	</div>
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_2.jpg" />                    
                	<div class="caption">
                		2-bit distortion<br>
                		capacity: 25%<br>
                		psnr: 44.14
                	</div>
                </td>   
            </tr>

			<tr>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_3.jpg" />                    
                	<div class="caption">
                		3-bit distortion<br>
						capacity: 37.5%<br>
						psnr: 37.90
                	</div>
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_4.jpg" />                   
                	<div class="caption">		
    	            	4-bit distortion<br>
						capacity: 50%<br>
						psnr: 31.77
                	</div>
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_5.jpg" />                    
                	<div class="caption">
                		5-bit distortion<br>
						capacity: 62.5%<br>
						psnr: 25.72                	
                	</div>
                </td>   
            </tr>

            <tr>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_6.jpg" />                    
                	<div class="caption">
						6-bit distortion<br>
						capacity: 75.0%<br>
						psnr: 19.89
                	</div>
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_7.jpg" />                    
                	<div class="caption">
						7-bit distortion<br>
						capacity: 87.5%<br>
						psnr: 13.99
                	</div>
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_8.jpg" />                    
                	<div class="caption">
						8-bit distortion<br>
						capacity: 100%<br>
						psnr: 8.67
                	</div>
                </td>   
            </tr>
        </tbody>        
    </table>
</div>

(click on the images for a larger version)

LSB insertion works surprisingly well; the first hint of image degradation doesn't seem to occur until 4-bit distortion, corresponding to a 3.1 MByte watermark for this particular image! This method seems to fail first in regions of flat color, with regions of high spatial frequencies being less affected by the distortion.

Despite excellent capacity and ease of implementation, LSB insertion suffers from several problems. First, it treats all parts of the image equally. Localizing the watermark in high-frequency regions would produce a more visually pleasing result. Second, LSB insertion is the least robust of all methods. It does not survive any sort of image manipulation, in particular JPEG compression. This is an example of a "fragile watermark".

As an experiment, I tried LSB insertion in the YCbCr color space instead of RGB, weighting the Cb and Cr channels more heavily than the Y. The YCbCr version is granier than the RGB and exhibits color artifacts throughout the image. Color "banding" seems more apparent, particularly in the shoulder region.

<div class="imageTable">
    <table>
        <tbody>
            <tr>
                <td>
                 	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_4.jpg" />                   
                	<div class="caption">		
    	            	RGB 4-bit distortion<br>
						capacity: 50%<br>
						psnr: 31.77
                	</div>
               </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_ycbcr.jpg" />    
                	<div class="caption">
                		YCbCr 4-bit distortion<br>
                		capacity: 50%<br>
                		psnr: 24.03
                	</div>
                </td>
            </tr>
		</tbody>
	</table>
</div>
(click on the images for a larger version) 
	
<!--
<div class="imageTable">
    <table>
        <tbody>
            <tr>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_1.jpg" />                    
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_6.jpg" />                    
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_7.jpg" />                    
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/lena_8.jpg" />
                </td>
            </tr>
        </tbody>
    </table>
</div>
-->

### Bit Plane Complexity Segmentation (BPCS)

BPCS attempts to address the shortcomings of LSB insertion by searching an image for noise-like regions. These regions are replaced with watermark data, while informative regions are undisturbed. The algorithm works as follows:

1. Convert a 2m x 2m N-bit/pixel image from natural binary into N-bit Gray Code.
2. Decompose the N-bit Gray code into N single-bit planes. Each plane forms a binary image.
3.  Divide each bit plane into 8x8 tiles.
4.     For each tile, compute the complexity &alpha.
5.     If &alpha is above a threshold, replace the tile with watermark data.
6. The bit-planes are recombined to form an N-bit channel in Gray code
7. The Gray code is converted back to natural binary 

<img src="{{site.baseurl}}assets/posts/steganography/bpcs_diagram.jpg" alt="My Image" />

The complexity metric is defined as:

$$ \alpha = \frac{k}{2 \times 2^m \times (2^m - 1 )} $$

where a tile has size $$2m \times 2m$$ pixels and $$k$$ is the sum of xor-ing adjacent bits in a tile, both in the horizontal and vertical direction. The valid range for $$\alpha$$ is $$0 \leq \alpha \leq 1$$. With this measumrent, an all white or all black tile would have $$\alpha=0$$, while a checkerboard pattern would have $$\alpha=1$$.

In the results below, the BPCS algorithm was run with the threshold $$\alpha=0.3$$. Notice how the sky, car, and grass seem relatively unaltered compared to the original image, while the tree in the foreground contains a relatively large amount of distortion. From a standard viewing distance, however, this distortion does not appear artificial. The tiled nature of the watermark is only evident on close inspection. 

<div class="imageTable">
    <table>
        <tbody>
            <tr>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/house_orig.jpg" />
                	<div class="caption">
      	          		Original image<br>
                		<br>
                		<br>             
            		</div>	       
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/bpcs_house.jpg" />                    
	             	<div class="caption">		
		             	BPCS with alpha=0.3 <br>
						capacity: 45.0%<br>
						psnr: 27.11
                	</div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
(click on the images for a larger version) 

### A Block Complexity based Data Embedding (ABCDE)

ABCDE works in a very similar method as BPCS, but employs a more sophisticated complexity metric. BPCS merely counts the number of bit-flips in each row and column of a given tile, with the assumption that a large number of bit flips indicates a lack of structure. ABCDE instead uses a pair of metrics that look for irregularity in a tile rather than high spatial frequencies. The authors' justification is that certain patterns, while high frequency, would produce unacceptable distortion if a watermark were embedded in them. 

<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/abcde_diagram.jpg" />                   

Patterns that are high frequency, but regular [5]

<div class="imageTable">
    <table>
        <tbody>
            <tr>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/check_orig.jpg" />
                	<div class="caption">
      	          		A checkerboard pattern                		
            		</div>	       
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/check_bpcs.jpg" />                    
	             	<div class="caption">		
		             	A checkerboard after BPCS watermarking
                	</div>
                </td>
            </tr>
        </tbody>
    </table>
</div>

ABCDE replaces BPCS' $$\alpha$$-complexity with two metrics: run-length irregularity and border noisiness. Run-length irregularity searches for patterns amongst a tile's rows and columns. The checkerboard pattern above, for example, would be rejected by this metric. Border noisiness attempts to find edges in an image between two relatively flat regions of color. Rejecting tiles that lie on boundaries avoids the apparent blurring of edges that can occur with BPCS. [5]

The results shown in the images below are particularly impressive. Despite the watermarked image having more than 60% of its image data overwritten, the differences between it and the original image are nearly imperceptible. 

<div class="imageTable">
    <table>
        <tbody>
            <tr>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/mandrill_orig.jpg" />
                	<div class="caption">
      	          		Original image<br>
      	          		<br>
      	          		<br>   		
            		</div>	       
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/mandrill_abcde.jpg" />                    
	             	<div class="caption">		
	             		Image with ABCDE watermarking<br>
						capacity: 61.0%<br>
						psnr: 24.26
                	</div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
(click on the images for a larger version) 

### Spread Spectrum

The previous three methods described are spatial-domain algorithms. They operate on the pixel intensities directly, concentrating the watermark data in perceptually insignificant parts of the image. While visually appealing, these techniques perform poorly in the presence of image manipulation. A high pass filter, for example, would strip the lower order bits used by LSB insertion.

[2] describes a frequency-domain method where the watermark is placed only in perceptually significant portions of an image. Their reasoning is that any attempt to remove the watermark would severely corrupt the original image data. To embed a watermark in significant regions inconspicuously, a spread spectrum technique is used. Spread spectrum is a method whereby a narrowband signal is spread across a signal of much larger bandwidth. The total energy of the narrowband signal at any particular frequency is very low, and thus is imperceptible to the casual observer. Interestingly, the original idea for the spread spectrum concept is due to Hollywood actress Hedy Lamarr and composer George Antheil, who reportedly thought of it after reviewing sheet music intended for sixteen pianos. [8]

The technique works as follows:

1. Convert the luminance channel into the frequency domain through a global discrete cosine transform
2. For each of n coefficients with the highest energy
3.   Add a random number with distribution ~N(0,1), scaled by a user parameter $$\alpha$$
4. Convert the image back to luminance 

The results below show that this technique has excellent transparancy properties. Even close inspection shows little degradation in image quality. The few artifacts appear as low frequency "noise", which is unlikely to be detected without statistical analysis. 

<div class="imageTable">
    <table>
        <tbody>
            <tr>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/peppers_orig.jpg" />
                	<div class="caption">
      	          		Original image<br>
      	          		<br>
      	          		<br>   		
            		</div>	       
                </td>
                <td>
                	<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/spread_peppers.jpg" />                    
	             	<div class="caption">	
	             		Image after spread spectrum watermarking.<br>
						psnr: 35.87	
                	</div>
            		<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/spread_error.jpg" />                    
	             	<div class="caption">	
	             		Error image (normalized)<br>						
                	</div>
                </td>
            </tr>
        </tbody>
    </table>
</div>

After encoding, the watermark can be detected through a similarity function:

    sim(X, X*) = (X* . X) / sqrt(X* . X*) 

where X is the original watermark and X* is the watermark extracted from output image. Note that to extract the watermark from the image the decoder must have a copy of the original image, and must know which coefficients were used in encoding. The plots compare the similarity values of the the extracted watermark to 100 random watermarks. Element 50 compares the extracted watermark to the genuine watermark The original can be detected easily after shrinking the image. Correct detection after JPEG compression is more difficult.

<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/iadct_resize.jpg" />                    
Encoded image after shrinking by 50%

<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/spread_resize_stem2.jpg" />                    
Watermark detection from resized image (watermark @ 50)

<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/iadct_jpg.jpg" />                    
Encoded image after JPEG compression with quality = 10

<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/spread_jpeg_stem2.jpg" />                    
Watermark detection after JPEG compression with quality=10

### Image Adaptive - Discrete Cosine Transform (IA-DCT)

IA-DCT extends the spread spectrum method by introducing local adapatability. In spread spectrum, the frequencies in an image are examined on a global level. Additionally, spread spectrum uses a constant weighting factor when adding a watermark to each of the DCT coefficients.

[9] describe an image-adaptive technique based on an 8x8 DCT. This approach allows for local control. The similarity to JPEG compression allows this method to be integrated easily into an existing JPEG image without decompression. In lieu of a fixed parameter, each 8x8 tile is weighted by a just-noticeable-difference (JND) function first described in [12]. This function uses an empirical model that accounts for the luminance and contrast masking properties of the human visual system.

The results look excellent, with no noticeable distortion. The error appears to mirror the image. 

<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/iadct_resize.jpg" />
Encoded image after shrinking by 50%

<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/iadct_resize_stem.jpg" />
Watermark detection from resized image

<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/iadct_jpg.jpg" />
Encoded image after JPEG compression

<img class="autoResizeImage" src="{{site.baseurl}}assets/posts/steganography/iadct_jpg_stem.jpg" />
Watermark detection after JPEG compression with quality=10

Conclusion and further research
--
This project described the development of digital watermarking techniques from the early methods to the more sophisticated techniques being explored recently. A surprising fact I discovered in the course of this report was that the original, "naive" LSB insertion method provided the same level of transparancy as the frequency-domain methods. Authors of more recent watermarking papers deride spatial-domain methods for being deprecated and lacking robustness. The advantages, however, appear to be a trade off. Frequency methods provide a good deal of robustness but lack the ability to store large amounts of arbitrary data, allowing instead a randomly generated "key". To authenticate a watermark, these algorithms frequently require some other data, such as the original, unencoded image. As is often the case, the choice of algorithm depends heavily on the application.

Most papers I have read approach watermarking from a digital rights or authentication standpoint. These applications of digital watermarking are analagous to the traditional paper watermarks. The unique medium of digital imagery allows for applications that have no such analogue. For example, an audio watermark in an image sequence could be used to sync audio with video. Meta-data could be inserted into an image for database applications, while still allowing backwards compatibility with the JPEG standard. Unique IDs could be embedded into images to analyze the network traffic of a particular group of users.

The field of watermarking is vast. Judging by the overwhelming number of publications, digital watermarking will undoubtedly have an important place in the way we exchange information in the future. 

Source code
--

some stuff

References
--

[^foot1]: DataGenetics: [Steganography](http://www.datagenetics.com/blog/march12012/index.html)

<!--
Images used in this project were obtained from USC-SIPI Image Database (http://sipi.usc.edu/database). The test images used were "Lenna", "Baboon (Mandrill)", "House", and "Peppers."

1. "Computation of SNR and PSNR," http://bmrc.berkeley.edu/courseware/cs294/fall97/assignment/psnr.html
2. Cox, I., et al. "Secure Spread Spectrum Watermarking for Multimedia," IEEE Trans. on Image Processing, vol. 6, no. 12, pp. 1673-1687.
3. "Examples of using AiS Watermark Pictures Protector," http://www.watermarker.com/watermark-protector/watermark-examples.aspx
4. Johnson, N. F. and Jajodia S. "Exploring Steganography: Seeing the Unseen," IEEE COMPUTER, vol. 31, no. 2, pp. 26-35, 1998.
5. Hirohia, H. "A Data Embedding Method Using BPCS Principle With New Complexity Measures," Kyoto University, Japan.
6. Niimi, M., et al. "Intensity Histogram Steganalysis in BPCS-Steganography," Proc. of the SPIE, vol 3413. pp. 555-564, August 2001.
7. "Peak Signal-to-noise ratio," http://en.wikipedia.org/wiki/PSNR
8. "Plausibility--The Invention of Secret Electronic Communication," http://godel.ph.utexas.edu/~tonyr/spread_spectrum.html.
9. Podilchuk, C. I. and Zeng, W.. "Image-Adaptive Watermarking Using Visual Models," IEEE Journal on Selected Areas in Comm., vol 16, no. 4, pp. 525-539, May 1998.
10. Wolfgang, R. B., Podilchuk C. I., and Delp, E. J. "Perceptual Watermarks for Digital Images and Video," Proc. of the IEEE, vol. 87, no. 7, pp. 1108-1126, July 1999.
11. "Watermark," http://en.wikipedia.org/wiki/Watermark
12. Watson, A. B. "DCT quantization matrices visually optimized for individual images," Proc. of the SPIE, vol 1913. pp. 202-216, Feb. 1993. 
-->
