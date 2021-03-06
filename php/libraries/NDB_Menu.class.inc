<?php
/**
 * This file contains the base class for an NDB_Menu. An NDB_Menu is the
 * base class for any menu page for a Loris module.
 *
 * PHP Version 5
 *
 * @category Main
 * @package  Main
 * @author   Loris Team <loris.mni@bic.mni.mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */

/**
 * Base Menu class
 *
 * @category Main
 * @package  Main
 * @author   Loris Team <loris.mni@bic.mni.mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */
class NDB_Menu extends NDB_Page
{
    /**
     * The menu's name
     *
     * @var    string
     * @access private
     */
    var $menu;

    /**
     * The menu's mode
     *
     * @var    string
     * @access private
     */
    var $mode;

    /**
     * Generates a new menu instance
     *
     * @param string $menu The name of the menu to use
     * @param string $mode The menu's mode
     *
     * @return object The new object of $menu type
     */
    static function &factory($menu, $mode)
    {
        // get the name of the class
        if (class_exists("NDB_Menu_$menu")) {
            $class = "NDB_Menu_$menu";
        } elseif (class_exists("NDB_Menu_Filter_$menu")) {
            $class = "NDB_Menu_Filter_$menu";
        } elseif (class_exists("NDB_Menu_Filter_Form_$menu")) {
            $class = "NDB_Menu_Filter_Form_$menu";
        } else {
            throw new Exception("The menu class ($menu) is not defined.");
        }

        // create a new menu object
        $obj = new $class;

        if (isset($_REQUEST['test_name'])) {
            $obj->Module = $_REQUEST['test_name'];
        } else {
            $obj->Module = $menu;
        }
        // set the local variables
        $obj->menu = $menu;
        $obj->mode = $mode;
        $access    = $obj->_hasAccess();

        // check that user has access
        if ($access == false) {
            throw new Exception("You do not have access to this page.", 403);
        }

        $factory  = NDB_Factory::singleton();
        $settings = $factory->settings();
        $obj->setTemplateVar('baseurl', $settings->getBaseURL());

        return $obj;
    }

    /**
     * Calls other member functions to do all the work necessary to create the menu
     *
     * @note   overloaded function
     * @return void
     * @access public
     */
    function setup()
    {
        return true;
    }

    /**
     * Override the menu pages to use the new LorisForm HTML_QuickForm replacement.
     * Menus can be done more easily than forms because they rarely have rules, so
     * this can be done before the LorisForm rule functionality is fully implemented.
     *
     * After support for forms is implemented, this override should be removed.
     *
     * @param string $name       See NDB_Page
     * @param string $page       See NDB_Page
     * @param string $identifier See NDB_Page
     * @param string $commentID  See NDB_Page
     * @param string $formname   See NDB_Page
     *
     * @return none
     */
    function _setupPage($name, $page, $identifier, $commentID, $formname)
    {
        $this->form = new LorisForm($formname);

        $this->name       = $name;
        $this->page       = $page;
        $this->identifier = $identifier;
        $this->commentID  = $commentID;
        $this->defaults   = array();

    }
    /**
     * Displays the menu page
     *
     * @return void
     * @access public
     */
    function display()
    {
        if ($this->skipTemplate) {
            return "";
        }
        // dump the html for the menu
        $smarty = new Smarty_neurodb($this->Module);
        $smarty->assign('mode', $this->mode);
        $smarty->assign($this->getTemplateData());
        $html = $smarty->fetch("menu_$this->menu.tpl");
        return $html;
    }
}
?>
