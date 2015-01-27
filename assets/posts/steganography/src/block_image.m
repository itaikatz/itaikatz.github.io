function out = block_image(im, blocksize, depth)
   
   if( size(im,3)==1 ) % single channel image
       out = get_blocks(im, blocksize);
       if depth=='binary'
           out = out > 0.5;
       end

       figure; imshow(out);
       for i = blocksize/2 : blocksize : size(im,2)  % x
       for j = blocksize/2 : blocksize : size(im,1)  % y           
           hue = floor(255.0 * out(j,i));
           if( hue > 128 ) hue_ = 0; else hue_ = 1; end           
           h = text(i, j, num2str(hue));
           set(h, 'HorizontalAlignment', 'center', 'Color', [hue_ hue_ hue_]);
       end
       end
   end
   
   if( size(im,3)==3 ) % RGB channel image
       im_r = get_blocks(im(:,:,1), blocksize);
       im_g = get_blocks(im(:,:,2), blocksize);
       im_b = get_blocks(im(:,:,3), blocksize);

       figure; imshow(out / 255);
       for i = blocksize/2 : blocksize : size(im,2)  % x
       for j = blocksize/2 : blocksize : size(im,1)  % y
           hue = uint32(floor(out(j,i)));
           if( hue > 128 ) hue_ = 0; else hue_ = 1; end
           h = text(i, j, num2str(hue));
           set(h, 'HorizontalAlignment', 'center', 'Color', [hue_ hue_ hue_]);
       end
       end

   end

return

function out = get_blocks(im, blocksize)
   fun = @(block_struct) ones(block_struct.blockSize) .* mean(block_struct.data(:));
   out = blockproc(im,[blocksize blocksize],fun)/255;
return