

lena = (imread('..\lena_0.jpg'));
lena_ = rgb2gray(lena);
close all; 
out = block_image(lena_, 32);


fun = @(block_struct) ones(block_struct.blockSize) .* mean(block_struct.data(:));

block = 32;
lena_out = blockproc(lena_,[block block],fun);

close all;
figure; imshow(lena_out ./ max(lena_out(:)))
for i = block/2 : block : size(lena,2)  % x
    %j = block/2 + 3*block;
    for j = block/2 : block : size(lena,1)  % y
    hold on;
       
        hue = uint32(floor(lena(j,i)));
        %hue_ = double(mod(hue+128, 255)+1) / 255.0
        if( hue > 128 ) hue_ = 0; else hue_ = 1; end
    h = text(i, j, num2str(hue));   
    set(h, 'HorizontalAlignment', 'center', 'Color', [hue_ hue_ hue_]);
    end
end

% lena = (imread('..\lena_0.jpg'));
% mandrill = (imread('..\mandrill_orig.jpg'));
% num_bits = 3;
% 
% lena_ = bitand(lena, 255-2^num_bits + 1);
% mandrill_ = bitsrl(mandrill, 8-num_bits);
% im = bitor(lena_, mandrill_);
% imshow(im); 
% 
% im = bitset(lena, 8-num_bits:8,0), birsll(mandrill, 8-

lena_ = lena(247:288, 249:283, :);
figure; imshow(lena_)
eye = imresize(lena_, 5);
eye(10:10:end, :) = 0;
eye(:, 10:10:end) = 0;
figure; imshow(eye)


function out = lsb_insertion(target, secret, n)

% Test that inputs are 8 bits, same number of channels

target_ = bitand(target, 255-2^n + 1); % Clear the lower n bits
secret_ = bitsrl(secret, 8-n);         % Shift target bits to lower n position
out = bitor(target_, secret_);         % insert n secret bits into target

return