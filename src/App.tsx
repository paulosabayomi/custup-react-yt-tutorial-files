import React from 'react';
import './App.css';
import CustUp, { TCustUp } from "@custup/react";

function App() {
  const ref1 = React.useRef<TCustUp | null>();
  const ref2 = React.useRef<TCustUp | null>();
  const ref3 = React.useRef<TCustUp | null>();
  const ref4 = React.useRef<TCustUp | null>();

  React.useEffect(() => {

    ref1.current?.addEventListener('file.beforeAdded', (e) => {
      // @ts-ignore
      console.log('file is about to be added', e, e.detail)
    })

    ref1.current?.on('file.afterAdded', (e) => {
      console.log("file has been added", e, e.detail);
      
    })

    ref1.current?.setOptions({
      file_upload_settings:{
        endpoint_url: 'http://localhost:6700/fileupload',
        files_field_name: 'file', // field name of the files
        form_field: '#form', // the id of the form element which will be serialized
        additional_data: { // to pass additional data to the request
            userid: 1234567890,
            username: 'johndoe',
        },
        axios_settings: { // the axios settings
            headers: {
                'Authorization': 'Bearer test_test_abcdefghijkl'
            },
            configs: {}
        }
      }
    })

    ref4.current?.setOptions({
      instance_attach: [ref1.current, ref2.current, ref3.current]
    })

  }, [ref4.current])

  const handleSubmit = React.useCallback(() => {
    ref4.current?.upload();
  }, [ref4.current])

  return (
    <div className="">
      <CustUp 
          id="first-example-instance" 
          ref={ref1}
          allowed_sources={['record_video', 'record_screen', 'openai_dalle_source']}
          default_files={[
            {file: 'https://s3-eu-west-1.amazonaws.com/blog-ecotree/blog/0001/01/ad46dbb447cd0e9a6aeecd64cc2bd332b0cbcb79.jpeg', isUploadable: true},
            {file: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU1AF092qio9lGMmwDvPhB_0SMikeZpcVfamxDLfJWmFXGy0fDO8aHp-N433ncya2jUCM&usqp=CAU', isUploadable: true},
            {file: 'https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2014/05/luvisi16.jpg?resize=600%2C600&ssl=1', isUploadable: true}, // URL for a file that is uploadable
        ]}
        // allowed_tools={['add_file','clear_files']}
        // @ts-ignore
        // allowed_tools={null}

        default_styles_override={{
          outerContainer: ['custup_outer_contaner', true], // added to control the width and to center CustUp
          innerContainer: ['inner_container_el', true], // appends new class name to the inner container element
          headerContainer: ['header_cont', true], // overrides all the element's class names
          footerContainer: 'footer_container',
          sidebarLeftContainer: 'side_bar_left',
          sidebarRightContainer: 'side_bar_right',
          custupInnerContainerWrapperEl: ['inner_container_wrapper', true], // a must add to  set the height of the inner container like `height: calc(100% - 100px)`
          // defaultUI: '', // this was added to hide the default UI
          scrollBarEl: ['custom_scroll_bar', true]
        }}
      />

      <CustUp
        id='second-example-instance'
        ui_type='detached'
        ref={ref2}
        on={[
          {
            type: 'library.beforeInit',
            callbackFn(e) {
                console.log("library has been initialized", e, e.target);
                // @ts-ignore
                // e.target!._custupEl.style.width = "800px"
            },
          },
          {
            type: 'library.init',
            callbackFn(e) {
                console.log("library has been initialized", e, e.target);
                // // @ts-ignore
                // e.target!._custupEl.style.width = "800px"
            },
          }
        ]}
      />

      <CustUp
        id='third-example-instance'
        ref={ref3}
        ui_type='elegant'
        file_upload_settings={{
          endpoint_url: 'http://localhost:6700/fileupload',
          files_field_name: 'file', // field name of the files
          form_field: '#form', // the id of the form element which will be serialized
          additional_data: { // to pass additional data to the request
              userid: 1234567890,
              username: 'johndoe',
          },
          axios_settings: { // the axios settings
              headers: {
                  'Authorization': 'Bearer test_test_abcdefghijkl'
              },
              configs: {}
          },
          should_chunk: true,
          chunk_size: 1024 * 1024 * 5 // 5 mb
        }} 
      />

      <CustUp
        id='fourth-example-instance'
        ref={ref4}
        ui_type='detached'
        single_upload={true}
        file_upload_settings={{
          endpoint_url: 'http://localhost:6700/fileupload',
          files_field_name: 'file', // field name of the files
          form_field: '#form', // the id of the form element which will be serialized
          additional_data: { // to pass additional data to the request
              userid: 1234567890,
              username: 'johndoe',
          },
          axios_settings: { // the axios settings
              headers: {
                  'Authorization': 'Bearer test_test_abcdefghijkl'
              },
              configs: {}
          }
        }} 
      />

      <form action="" id="form">
        <input type="text" name="fullname" value={"John Doe"} />
        <input type="email" name="email" value={"johndoe@g.com"} />
      </form>

      <button type="button" onClick={handleSubmit}>Submit</button>
      
    </div>
  );
}

export default App;
