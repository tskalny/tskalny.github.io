
<?php
	
	if ($_GET['tr'] == 1) {
		$transparent = true;
	} else {
		$transparent = false;
	}
	
	if ($_GET['sa'] == 1) {
		$scriptaccess = true;
	} else {
		$scriptaccess = false;
	}
	
	if ($_GET['fs'] == 1) {
		$fullscreen = true;
	} else {
		$fullscreen = false;
	}
	
	if ($_GET['ct']) {
		$clicktag = $_GET['ct'];
	} else {
		$clicktag = false;
	}
	
	if ($_GET['sort'] == "az") {
		$sort = "az";
	} else if ($_GET['sort'] == "za") {
		$sort = "za";
	} else if ($_GET['sort'] == "0") {
		$sort = "0";
	} else {
		$sort = "az";
	}
	
	function getMeta($filePath) {
		if (is_file($filePath)) { 
			$date = explode("_", $fileName);
			$file = file($filePath);
			
			$data = explode("|", $file[1]);
			$data[2] = $date[0];
		} else {
			$data = array("Undefined", "UN", "2000-00"); 
		}
		
		return $data;
	}
	
	function readHtml($level0) { 
		global $sort;
		
		$index = array();
		$db = array();
		
		
		if (is_dir($level0)) { 
			if ($handler0 = opendir($level0)) { 
				while (($level1 = readdir($handler0)) !== false) { 
					if (is_dir($level0."/".$level1) && $level1 != "" && $level1 != "." && $level1 != ".." && $level1 != "jpg" && $level1 != "gif" && $level1 != "drafts") { 
						
							$index[$level1] = $level1;
							$db[$level1] = array();
							$db[$level1]["name"] = $name;
							$db[$level1]["path"] = $level0."/".$level1;
							$db[$level1]["title"] = $level1;
							$db[$level1]["size"] = getSize(filesize($level0."/".$level1));
							$db[$level1]["params"] = getParams($level0."/".$level1);

							
							$filename = $db[$level1]["title"];
							$firstIndex = stripos($filename, "_");
							$db[$level1]["dimensions"] = $firstIndex;
							
							
							$firstIndexX = stripos($filename, "x");
							$width = substr($filename,0, $firstIndexX);
							$db[$level1]["width"] = $width;
							if (strpos($filename, '_') !== false) {
							$resultIndex = $firstIndex - $firstIndexX-1;
							$height = substr($filename,$firstIndexX+1, $resultIndex);
							$db[$level1]["height"] = $height;
							}
							else {
							$height = substr($filename,$firstIndexX+1);
							$db[$level1]["height"] = $height;	
								
							}
					}
				}
			}
		}
		
krsort($index);
		
		
		showHtml($index, $db);
	}
	
	function showHtml($index, $db) {
		global $transparent, $clicktag, $scriptaccess, $fullscreen;
		
		$count = 0;
		foreach ($index as $keys => $value) {
			$count++;
			echo "<tr>\n";
		if (file_exists($db[$keys]["path"]."/index.html"))   echo "<td class=\"preview\"><iframe src=\"".$db[$keys]["path"]."/index.html\" frameBorder='0' width='".$db[$keys]["width"]."' height='".$db[$keys]["height"]."' scrolling='no'></iframe></td>\n";
			else {
				echo "<td id='itm'><img src='".$db[$keys]["name"]["path"]."' width='".$db[$keys]["params"][0]."' height='".$db[$keys]["params"][1]."' border='0'></td>\n";
			}
			echo "</tr>\n";
			echo "<tr>\n";
			echo "	<td id='exp'>".$db[$keys]["title"]."</td>";
			echo "</tr>\n";
			echo "<tr><td id='dev".$count."' bgcolor='#eeeeee' height='1'></td></tr>";
		}
	}
	
	
	function readFiles($level0) { 
		global $sort;
		
		$index = array();
		$db = array();
		
		if (is_dir($level0)) { 
			if ($handler0 = opendir($level0)) { 
				while (($level1 = readdir($handler0)) !== false) { 
					$name = $level1;
					$extension = substr($name, -strpos(strrev($name), "."));
					
					if (is_file($level0."/".$level1)) { 
						if ($extension == "gif" || $extension == "GIF" || $extension == "png" || $extension == "PNG" || $extension == "jpg" || $extension == "JPG" || $extension == "jpeg" || $extension == "JPEG" || $extension == "swf" || $extension == "SWF") {
							$index[$level1] = $level1;
							$db[$level1] = array();
							$db[$level1]["name"] = $name;
							$db[$level1]["path"] = $level0."/".$level1;
							$db[$level1]["path"] = str_replace("./", "", $db[$level1]["path"]);
							$db[$level1]["extension"] = $extension;
							$db[$level1]["size"] = getSize(filesize($level0."/".$level1));
							$db[$level1]["params"] = getParams($level0."/".$level1);
						}
					}
				}
			}
		}
		
		if ($sort == "za") {
			ksort($index);
		} if ($sort == "az") {
			krsort($index);
		} else {
			//krsort($index);
		}
		
		showFiles($index, $db);
	}
	
	function showFiles($index, $db) {
		global $transparent, $clicktag, $scriptaccess, $fullscreen;
		
		$count = 0;
		foreach ($index as $keys => $value) {
			$count++;
			echo "<tr>\n";
			echo "	<td id='itm'>";
			if ($db[$keys]["extension"] == "swf" || $db[$keys]["extension"] == "SWF") {
				echo "
					<div id='".$db[$keys]["name"]."' width='".$db[$keys]["params"][0]."' height='".$db[$keys]["params"][1]."'></div>
					<script type='text/javascript'>
						var FLASH = new SWFObject('".$db[$keys]["path"]."', '".$db[$keys]["name"]."', '".$db[$keys]["params"][0]."', '".$db[$keys]["params"][1]."', '10', '#ffffff');
							FLASH.addParam('quality', 'best');";
				if ($transparent) echo "
							FLASH.addParam('wmode', 'transparent');";
				if ($scriptaccess) echo "
							FLASH.addParam('AllowScriptAccess', 'always');";
				if ($fullscreen) echo "
							FLASH.addParam('allowFullScreen', 'true');";
				echo "
							FLASH.addParam('menu', 'false');";
							
				if ($clicktag) echo "
							FLASH.addVariable('clickTag', '".$clicktag."');
							FLASH.addVariable('clickTAG', '".$clicktag."');
							FLASH.addVariable('clicktag', '".$clicktag."');";
				echo "
							FLASH.write('".$db[$keys]["name"]."');
					</script>\n";
			} else {
				echo "<img src='".$db[$keys]["path"]."' width='".$db[$keys]["params"][0]."' height='".$db[$keys]["params"][1]."' border='0'>\n";
			}
			echo "	</td>";
			echo "</tr>\n";
			echo "<tr>\n";
			echo "	<td id='exp'>".$db[$keys]["name"]." (".$db[$keys]["params"][0]."x".$db[$keys]["params"][1]." / ".$db[$keys]["size"].")<br/><a href='".$db[$keys]["path"]."' target='_blank'>Download using right-click</a></td>";
			echo "</tr>\n";
			echo "<tr><td id='dev".$count."' bgcolor='#eeeeee' height='1'></td></tr>";
		}
	}
	
	
	
	
	function getSize($size) {
		$kb = 1024; 
		$mb = 1024 * $kb;
		$gb = 1024 * $mb;
		$tb = 1024 * $gb;
	
		if ($size < $kb) {
			return $size." B";
		} else if($size < $mb) {
			return round($size/$kb, 2)."KB";
		} else if($size < $gb) {
			return round($size/$mb, 2)."MB";
		} else if($size < $tb) {
			return round($size/$gb, 2)."GB";
		} else {
			return round($size/$tb, 2)."TB";
		}
	}
	
	function getParams($file) {
		$size = getimagesize($file);
		return array($size[0], $size[1], $size[2]);
	}
	
	$meta = getMeta("../meta.txt");
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="expires" content="-1">
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<title>DEMO</title>
		<script type="text/javascript" src="http://demo.mediamenu.ee/aol/swfobject.js"></script>
		<script language="javascript">
			<!--
			function changebgcolor(color1, color2) {
				document.bgColor = color1;
				document.getElementById('top').bgColor = color2;
				var devs = document.getElementsByTagName('td');
				for (var i=1; i <= devs.length; i++) {
					document.getElementById('dev'+i).bgColor = color2;
				}
			}
			//-->
		</script>
		<style>
			body { margin: 0px; }
			table { font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #666666; }
			td { text-align: center; }
			a { color: #88ceff; text-decoration: none; }
			a:hover { color: #57baff; text-decoration: none; }
			.preview {padding-top: 50px; padding-bottom:10px;}
			#itm { padding: 50px; padding-bottom: 10px; }
			#exp { padding: 5px; padding-bottom: 40px; }
			#top { height: 40px; padding: 0px; padding-left: 20px; padding-right: 20px; }
			.button {
				    background-color: #4CAF50;
    border: none;
    color: #fff;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
	margin-bottom: 40px;
			}
			
			.button  a{
    color: #fff;
	background-color: #3b833e;
}
.button:hover {
	color:#fff;
	background-color: #3b833e;
}
		</style>
	</head>
	
	<body>
		<table width="100%" height="100%" cellpadding="0" cellspacing="0">
			<tr><td id="top" bgcolor="#eeeeee">
				<table width="100%" height="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="105" style="text-align: left; color: #666666;">Background color:</td>
						<td width="30" style="background-color: #ffffff; cursor: pointer;" onclick="javascript:changebgcolor('#ffffff', '#eeeeee');"></td>
						<td width="30" style="background-color: #cccccc; cursor: pointer;" onclick="javascript:changebgcolor('#cccccc', '#dddddd');"></td>
						<td width="30" style="background-color: #888888; cursor: pointer;" onclick="javascript:changebgcolor('#888888', '#999999');"></td>
						<td width="30" style="background-color: #222222; cursor: pointer;" onclick="javascript:changebgcolor('#222222', '#333333');"></td>
						<td width="30" style="background-color: #000000; cursor: pointer;" onclick="javascript:changebgcolor('#000000', '#111111');"></td>
						<td style="text-align: right; color: #666666;"></td>
					</tr>
				</table>
			</td></tr>
			<?php
			
			if (file_exists("zip.zip"))   echo "<tr><td class=\"preview\"><a href=\"zip.zip\" target=\"_self\" class=\"button\">Download all files</a></td><tr><tr><td id='dev4' bgcolor='#eeeeee' height='1'></td></tr>\n";
			?>
			
			<?php readHtml("."); ?>
			<?php readFiles("."); ?>
	
		</table>
	</body>
</html>