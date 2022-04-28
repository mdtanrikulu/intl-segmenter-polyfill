# Copyright 2018 The Emscripten Authors.  All rights reserved.
# Emscripten is available under two separate licenses, the MIT license and the
# University of Illinois/NCSA Open Source License.  Both these licenses can be
# found in the LICENSE file.

import logging
import os
import shutil

TAG = 'release-71-1'
VERSION = '71_1'
HASH = '4e4e2bbf64432a096ae2325d71fe2f9fff899f3797a3a585059aada715cdc51f3fb867a53d274a8c20c41c98905d3daec88fad09d5e0ca9fe4e624b2b8010d30'
SUBDIR = ''

def get(ports, settings, shared):
  if settings.USE_ICU != 1:
    return []

  url = 'https://github.com/unicode-org/icu/releases/download/%s/icu4c-%s-src.zip' % (TAG, VERSION)
  ports.fetch_project('icu', url, 'icu', sha512hash=HASH)
  libname = ports.get_lib_name('libicuuc')

  def create():
    logging.info('building port: icu')

    source_path = os.path.join(ports.get_dir(), 'icu', 'icu')
    dest_path = os.path.join(shared.Cache.get_path('ports-builds'), 'icu')

    shutil.rmtree(dest_path, ignore_errors=True)
    print(source_path)
    print(dest_path)
    shutil.copytree(source_path, dest_path)

    final = os.path.join(dest_path, libname)
    ports.build_port(os.path.join(dest_path, 'source', 'common'), final, [os.path.join(dest_path, 'source', 'common')], ['-DU_COMMON_IMPLEMENTATION=1'])

    ports.install_header_dir(os.path.join(dest_path, 'source', 'common', 'unicode'))
    return final

  return [shared.Cache.get(libname, create)]


def clear(ports, shared):
  shared.Cache.erase_file(ports.get_lib_name('libicuuc'))


def process_args(ports, args, settings, shared):
  if settings.USE_ICU == 1:
    get(ports, settings, shared)
  return args


def show():
  return 'icu (USE_ICU=1; Unicode License)'
