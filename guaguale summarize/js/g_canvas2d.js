define('./g_canvas2d', function() {
    var Canvas2d = function($canvas) {
        var context = $canvas[0].getContext("2d"),
            width = $canvas[0].width,
            height = $canvas[0].height,
            pageOffset = $canvas.offset();
        context.textBaseline = "top";
        this.setfont = function(fontStyle) {
            if (fontStyle) {
                context.font = fontStyle;
            } else {
                context.font = "12px  Verdana, Geneva, sans-serif  ";
            }
        }
        this.setLineWidth = function(w) {
            if (w) {
                context.lineWidth = w;
            } else {
                context.lineWidth = 20;
            }
        }
        this.getData = function() {
            data = context.getImageData(0, 0, width, height).data;
            return data;
        }
        this.width = function() {
            return width;
        }
        this.height = function() {
            return height;
        }

        this.resetOffset = function() {
            pageOffset = $canvas.offset();
        }

        $(window).resize(function() {
            pageOffset = $canvas.offset();
        });

        this.getCanvasPoint = function(pageX, pageY) {
            return {
                x: pageX - pageOffset.left,
                y: pageY - pageOffset.top
            }
        }

        this.clearRect = function(start, end) {
            context.clearRect(start.x, start.y, 10, 10);
            context.beginPath();
            context.globalCompositeOperation = 'destination-out';
            context.fillStyle = 'rgba(0,0,234,1)';
            context.arc(start.x, start.y, 10, 0, 2 * Math.PI, true);
            context.fill();
            context.closePath();
            context.globalCompositeOperation = 'source-over';
            return this;
        }; 
        this.clear = function() {
            context.clearRect(0, 0, width, height);
            return this;
        };
        this.drawLine = function(start, end) {
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.stroke();
            return this;
        };
        this.drawRect = function(start, end, isFill) {
            var w = end.x - start.x,
                h = end.y - start.y;
            if (isFill) {
                context.fillRect(start.x, start.y, w, h);
            } else {
                context.strokeRect(start.x, start.y, w, h);
            }
        };

        this.drawCircle = function(center, radius, fill) {
            context.beginPath();
            context.arc(center.x, center.y, radius, 0, Math.PI * 2, true);
            if (fill)
                context.fill();
            else
                context.stroke();
        };

        this.drawPoints = function(points) {
            context.beginPath();
            context.moveTo(points[0].x, points[0].y);

            for (var i = 1; i < points.length; i++) {
                context.lineTo(points[i].x, points[i].y);
            }
            context.stroke();
            return this;
        };

        this.drawText = function(text, point, fill, fontSize) {
            var metrics = context.measureText(text);
            var posX = (width - metrics.width) / 2,
                posY = (height - (parseInt(fontSize) || 12)) / 2;
            context.font = fontSize;
            if (fill) {
                context.fillText(text, point.x || posX, point.y || posY);
            } else {
                context.strokeText(text, point.x || posX, point.y || posY);
            }
        };

        this.drawEllipse = function(center, end, fill) {
            var rx = Math.abs(end.x - center.x);
            var ry = Math.abs(end.y - center.y);

            var radius = Math.sqrt(rx * rx, ry * ry);

            context.save();
            context.translate(center.x, center.y);
            context.scale(rx / radius, ry / radius);
            context.beginPath();
            context.arc(0, 0, radius, 0, Math.PI * 2, true);
            context.closePath();
            if (!fill)
                context.stroke();
            else
                context.fill();

            context.restore();
        };
        this.drawImage = function(imgsrc, drawImg) {
            var img = new Image();
            try {
                img.setAttribute('crossOrigin', "anonymous");
                img.onload = function() {
                    if(drawImg){
                        context.drawImage(img, drawImg.x,drawImg.y,drawImg.width,drawImg.height ,0, 0,width, height);
                    } else {
                        context.drawImage(img, 0, 0, width, height);
                    }
                    localStorage.setItem("savedImageData", $canvas[0].toDataURL("pic/png"));
                }
                img.src = imgsrc;
            } catch (e) {
                console.log(e)
            }
            // make sure the load event fires for cached images too  
            if (img.complete || img.complete === undefined) {
                img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                img.src = imgsrc;
            }
        }

        this.penWidth = function(newWidth) {
            if (arguments.length) {
                context.lineWidth = newWidth;
                return this;
            }
            return context.lineWidth;
        };

        this.penColor = function(newColor) {
            if (arguments.length) {
                context.strokeStyle = newColor;
                context.fillStyle = newColor;
                return this;
            }

            return context.strokeStyle;
        };

        this.penOpacity = function(newOpacity) {
            if (arguments.length) {
                context.globalAlpha = newOpacity;
                return this;
            }
            return context.globalAlpha;
        };

        this.fontSize = function(fontSize) {
            if (arguments.length) {
                context.font = fontSize + "px Verdana, Geneva, sans-serif";
                return this;
            }

            return context.fontSize;
        }


        this.savePen = function() {
            context.save();
            return this;
        };
        this.restorePen = function() {
            context.restore();
            return this;
        };

    };

    return Canvas2d;
})